<?php
session_start();
require_once __DIR__.'/../../vendor/autoload.php';
require_once '../access/Access.php';
use app\Database;
use acc\Access;

$db = new Database(require_once '../../config/config.php');



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


/**
 * Добавляет новую заявку в БД
 */
if(isset($_REQUEST['addApply'])){
    $new_apply = (array) json_decode(file_get_contents('php://input'));

    $result = $db->query('INSERT INTO `declarations` (`code_declarer`, `type`, `criticality`, `description`, `address`) VALUES (:code_declarer, :type, :criticality, :description, :address)',[
            'code_declarer' => $_SESSION['userId'],
            'type'          => $new_apply['type'],
            'criticality'   => $new_apply['criticality'],
            'description'   => $new_apply['description'],
            'address'       => $new_apply['address']
        ]);
    $db->close();

        echo $result;

}
//------------------------------------------------------------------------------------------------------------------