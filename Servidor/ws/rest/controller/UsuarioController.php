<?php
include_once '../config/Conn.php';

class UsuarioController
{    
    public function login($usuario)
    {
        $conn = getConn();        
        $sql = "SELECT * FROM usuario WHERE loginUsuario = '$usuario->loginUsuario' AND senhaUsuario = '$usuario->senhaUsuario' LIMIT 1";
        $q = $conn->prepare($sql);
        $q->execute();
        echo json_encode($q->fetch(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE);        
    }

    public function cadastro($usuario)
    {
        $conn = getConn();        
        $sql = "INSERT INTO usuario (idUsuario, loginUsuario, senhaUsuario, isPilotoUsuario) values ('0', '$usuario->loginUsuario', '$usuario->senhaUsuario','0')";
        $q = $conn->prepare($sql);
        
        if ($q->execute()){
            echo json_encode(true, JSON_UNESCAPED_UNICODE); 
        } else {
            echo json_encode(false, JSON_UNESCAPED_UNICODE);
        }; 
    }
}