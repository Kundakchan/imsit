<?php
session_start();
require_once __DIR__.'/../../vendor/autoload.php';
use app\Database;
use acc\Access;
require_once '../access/Access.php';
$db = new Database(require_once '../../config/config.php');
//---------------------------------------------------------------------------------------------------------

//Проверка прав пользователя
if(isset($_REQUEST['access'])){
    $e = new Access($_SESSION);
    echo $e->result;
}
//---------------------------------------------------------------------------------------------------------

//Обнавления данных о пользователи
if(isset($_REQUEST['userDataUpdate'])){
   $update = (array) json_decode(file_get_contents('php://input'));
   if($update['new_password_1'] === '' || $update['new_password_1'] === null){

       $pass = $db ->query('SELECT `password` FROM `users` WHERE `id` = :id', [
           'id'        => $_SESSION['userId']
       ]);

       $update['new_password_1'] = $pass[0]['password'];
   }

    $db -> query('UPDATE `users` SET `fio` = :fio, `email` = :email, `login` = :login, `password` = :password WHERE `users`.`id` = :id', [
        'fio'       => $update['fio'],
        'email'     => $update['email'],
        'login'     => $update['login'],
        'password'  => $update['new_password_1'],
        'id'        => $_SESSION['userId']
    ]);

    echo json_encode(user_info($db));
    $db->close();
}
//---------------------------------------------------------------------------------------------------------

//Автозагрузка даных о пользователи
if(isset($_REQUEST['load'])){
    echo json_encode(user_info($db));
    $db->close();
}
//---------------------------------------------------------------------------------------------------------

//Авто загрузка номера телефона
if(isset($_REQUEST['loadPhone'])){
    $load_phone = $db->query('SELECT `id`, `phone` FROM `phone_numbers` WHERE `code_user` = :id', [
        'id' => $_SESSION['userId']
    ]);
    $db->close();
    echo json_encode($load_phone);
}
//---------------------------------------------------------------------------------------------------------

//Начальные данные модального окна
if (isset($_REQUEST['modalInformationUser'])){
    $select = $db->query('SELECT `fio`, `email`, `login` FROM `users` WHERE `id` = :id',[
        'id' => $_SESSION['userId']
    ]);
    $db->close();
    echo json_encode($select);
}
//---------------------------------------------------------------------------------------------------------

//Добавления номера телефона
if(isset($_REQUEST['insertPhone'])){
    $new_phone = (array) json_decode(file_get_contents('php://input'));
    $db ->query('INSERT INTO `phone_numbers` (`code_user`, `phone`) VALUES (:code_user, :phone)', [
        'code_user' => $_SESSION['userId'],
        'phone'     => $new_phone['phone']
    ]);
}
//---------------------------------------------------------------------------------------------------------

//Удаления контактного номера телефона
if(isset($_REQUEST['deletePhone'])){
    $id_phone = (array) json_decode(file_get_contents('php://input'));
    $db -> query('DELETE FROM `phone_numbers` WHERE `phone_numbers`.`id` = :id',[
        'id' => $id_phone['idPhone']
    ]);
}
//---------------------------------------------------------------------------------------------------------

//Права доступа к навигоционнуму меню
if(isset($_REQUEST['privilegeAccess'])){
    $url = (array) json_decode(file_get_contents('php://input'));
    require_once '../access/Access_Left_nav.php';
    $access = new \acc\Access_Left_nav($_SESSION, $url);
    echo $access->result;
}
//---------------------------------------------------------------------------------------------------------


/**
 * @param $db
 * @return mixed
 */
function user_info($db){
    $info = $db->query('SELECT `id`, `fio`, `email`, `login`, `privilege`, `date` FROM `users` WHERE `id` = :id', [
        'id' => $_SESSION['userId']
    ]);
    $db->close();
    return $info[0];
}
//---------------------------------------------------------------------------------------------------------