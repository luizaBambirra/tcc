<?php
header('Cache-Control: no-cache, must-revalidate');
header('access-control-allow-origin: *');

include_once '../config/Conn.php';
require '../controller/UsuarioController.php';

$usuario = json_decode(file_get_contents("php://input"));
$filter = filter_input(INPUT_SERVER, 'REQUEST_METHOD');

if (isset($_GET['page_key'])) {

    if ($filter === 'GET') {

    } elseif ($filter === 'POST') {
        if ($_GET["page_key"] == 'login') {
            $objUsuario = new UsuarioController;
            echo $objUsuario->login($usuario);

        } elseif ($_GET["page_key"] == 'cadastro') {
            $objUsuario = new UsuarioController;
            echo $objUsuario->cadastro($usuario);
        }
    } elseif ($filter === 'PUT') {} elseif ($filter === 'DELETE') {}
}