<?php

//Conecta ao banco de dados
function Conectar()
{
    $Host = 'localhost';
    $Port = '3306';
    $User = 'root';
    $Pass = 'root';
    $Dbsa = 'motoapp';
    $Connect = null;

    try {
        if ($Connect == null):
            $dsn = 'mysql:host=' . $Host . ':' . $Port . ';dbname=' . $Dbsa;
            $options = [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8'];
            $Connect = new PDO($dsn, $User, $Pass, $options);
        endif;
    } catch (PDOException $e) {
        PHPErro($e->getCode(), $e->getMessage(), $e->getFile(), $e->getLine());
        die;
    }
    $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $Connect;
}

//Retorna o objeto de conexao
function getConn()
{
    return Conectar();
}