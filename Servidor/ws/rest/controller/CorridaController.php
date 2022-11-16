<?php
include_once '../config/Conn.php';

class CorridaController
{
    public function get($id = null)
    {
        $conn = getConn();
        if ($id !== null) {
            $sql = "SELECT * FROM corrida WHERE idCorrida = $id AND canceladoCorrida = false";
        } else {
            $sql = "SELECT * FROM corrida WHERE canceladoCorrida = false ORDER BY dtHoraCorrida desc";
        }
        $q = $conn->prepare($sql);
        $q->execute();
        $tmpCorridas = $q->fetchAll(PDO::FETCH_OBJ);
        $corridas = $this->montaRetornoCorridas($tmpCorridas, $conn, false);
        return json_encode($corridas, JSON_UNESCAPED_UNICODE);
    }

    public function getAll() {
        $conn = getConn();
        $sql = "SELECT * FROM corrida ORDER BY dataSolicitacaoCorrida desc";
        $q = $conn->prepare($sql);
        $q->execute();
        $corridas = $q->fetchAll(PDO::FETCH_OBJ);
        return json_encode($corridas, JSON_UNESCAPED_UNICODE);
    }   

    /**
     * Converte true e false em 0 e 1 respectivamente
     * feito isso pois o php não consegue montar as instruções do banco com booleanos
     *
     */
    private function parseBools($objeto)
    {
        foreach ($objeto as $key => $val) {
            if (is_array($val)) {
                foreach ($val as $subLista) {
                    CorridaController::parseBools($subLista);
                }
            } else {
                if ($val === true) {
                    $objeto->$key = '1';
                } else if ($val === false) {
                    $objeto->$key = '0';
                }
            }
        }

        return $objeto;
    }

    public function set($corrida)
    {
        $corrida = CorridaController::parseBools($corrida);

        $conn = getConn();
        $conn->beginTransaction();

        try {
            $conn = getConn();
            $conn->beginTransaction();
            /**
             * Limpa todos os dados para refazer,
             * se der algum erro fará rollBack para preservar os dados já existentes
             */
            if ($corrida->idCorrida != 0) {
                $sqlDel = "DELETE FROM foto WHERE tipoFoto = 1 AND idReferenteFkFoto = $corrida->idCorrida";
                $q = $conn->prepare($sqlDel);
                $q->execute();
                $sqlDel = "DELETE FROM corrida WHERE idCorrida = $corrida->idCorrida";
                $q = $conn->prepare($sqlDel);
                $q->execute();
            }

            $sql = "INSERT INTO corrida (
                idCorrida,
                idClinicaFkCorrida,
                tituloCorrida,
                textoCorrida,
                dtHoraCorrida,
                canceladoCorrida
            ) VALUES (
                $corrida->idCorrida,
                {$corrida->clinicaCorrida->idClinica},
                '$corrida->tituloCorrida',
                '$corrida->textoCorrida',
                '$corrida->dtHoraCorrida',
                $corrida->canceladoCorrida
            )";

            $q = $conn->prepare($sql);           

            if ($q->execute()) {
                if ($corrida->idCorrida == 0) {
                    $q = $conn->prepare("SELECT LAST_INSERT_ID() as idCorrida");
                    $q->execute();
                    $ret = (object) $q->fetch(PDO::FETCH_ASSOC);
                    $corrida->idCorrida = $ret->idCorrida;
                }
            } else {
                return json_encode(false, 128);
            }

            if ($conn->commit()) {
                $fcm = new FcmController;
                $obj = new stdClass();
                $paramNotificacao = new stdClass();
                $paramNotificacao->idCorrida = $corrida->idCorrida;
                $obj->data = $paramNotificacao;                
                $obj->title = "Temos uma Dica para você!";
                $obj->subtitle = $corrida->tituloCorrida;
                $obj->body = $corrida->textoCorrida;
                $fcm->sendMessage($obj);
            } else {
                echo "caiu no elseeee do commit";
                $conn->rollBack();
                return json_encode(false, 128);
            }
        } catch (Throwable $e) {
            echo "caiu no catch: $e";
            $conn->rollBack();
            return json_encode($e->getMessage(), 128);
        }
    }

}