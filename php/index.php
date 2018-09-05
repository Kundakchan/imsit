<?php
session_start();
require_once __DIR__.'/../vendor/autoload.php';
use app\Database;
$db = new Database(require_once '../config/config.php');

if($_REQUEST['button'] === 'registration'){
    $data = (array) json_decode(file_get_contents('php://input'));
    if($data['password_1'] === $data['password_2']){
        $select = $db->query("SELECT `login` FROM `users` WHERE `login` = :login", [
            'login' => $data['login']
        ]);

        if(empty($select)){
            $insert = $db->query("INSERT INTO `users` (`fio`, `email`, `login`, `password`) VALUES (:fio, :email, :login, :password)", [
                'fio'       => $data['fio'],
                'email'     => $data['email'],
                'login'     => $data['login'],
                'password'  => $data['password_1']
            ]);
            $db->close();
            echo 2;
        }
        else{
            echo 1;
        }
    }
    else{
        echo 0;
    }
}
elseif ($_REQUEST['button'] === 'authorization'){
    $data = (array) json_decode(file_get_contents('php://input'));
    $select = $db->query("SELECT `id`, `privilege`, `status` FROM `users` WHERE `login`=:login AND `password`=:password", [
        'login'     => $data['login'],
        'password'  => $data['password']
    ]);
    $db->close();
    if(!empty($select)){
        $_SESSION['userId'] = $select[0]['id'];
        $_SESSION['userPrivilege'] = $select[0]['privilege'];
        $_SESSION['userStatus'] = $select[0]['status'];
        echo 1;
    }
    else{
        echo 0;
    }
}
