<?php
session_start();
require_once __DIR__.'/../../vendor/autoload.php';
require_once '../access/Access.php';
use app\Database;
use acc\Access;

$db = new Database(require_once '../../config/config.php');



//Загрузкаа данных пользователей
if(isset($_REQUEST['loadUserData'])){
    $select = $db->query("SELECT `id`, `fio`, `email`, `login`, `date`, `privilege`, `status` FROM `users`");
    echo json_encode($select);
}
//------------------------------------------------------------------------------------------------------------------

//Проверка прав пользователя
if(isset($_REQUEST['access'])){
    $e = new Access($_SESSION);
    echo $e->result;
}
//------------------------------------------------------------------------------------------------------------------

//Права доступа к навигоционнуму меню
if(isset($_REQUEST['privilegeAccess'])){
    $url = (array) json_decode(file_get_contents('php://input'));
    require_once '../access/Access_Left_nav.php';
    $access = new \acc\Access_Left_nav($_SESSION, $url);
    echo $access->result;
}
//------------------------------------------------------------------------------------------------------------------


if(isset($_REQUEST['loadEdit'])){
    $data = (array) json_decode(file_get_contents('php://input'));

    $select = $db->query("SELECT users.fio, users.email, users.login, users.privilege, users.status FROM users WHERE id = :id", [
        'id' => $data['id']
    ]);

    print_r($select[0]);
}