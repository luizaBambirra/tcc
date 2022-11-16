<?php
header('Cache-Control: no-cache, must-revalidate');
header('access-control-allow-origin: *');

include_once '../config/Conn.php';
require '../controller/CorridaController.php';

$data = json_decode(file_get_contents("php://input"));
$filter = filter_input(INPUT_SERVER, 'REQUEST_METHOD');

if (isset($_GET['page_key'])) {    
    if ($filter === 'GET') {
        if ($_GET["page_key"] === 'get') {
            $corrida = new CorridaController;
            echo $corrida->get($_GET['id']);
        } else if ($_GET["page_key"] === 'getAll') {
            $corrida = new CorridaController;
            echo $corrida->getAll();
        }
    } elseif ($filter === 'POST') {
        if ($_GET["page_key"] === 'set') {
            $corrida = new CorridaController;
            echo $corrida->set($data);
        }
    } elseif ($filter === 'PUT') {} elseif ($filter === 'DELETE') {}

}