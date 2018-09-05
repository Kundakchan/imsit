<?php

namespace acc;

class Access{
    public $session;
    public $result;

    public function __construct($session)
    {
        $this->session = $session;
        $this->result = $this->isset_session();
    }

    public function isset_session(){
        if(isset($this->session['userId']) && isset($this->session['userStatus']) && isset($this->session['userPrivilege'])){
            return $this->status();
        }
        else{
            return 'a';
        }
    }

    public function status(){
        if($this->session['userStatus'] === 1){
            return $this->privilege();
        }
        elseif ($this->session['userStatus'] === 0){
            return 's';
        }
        else{
            return 'b';
        }
    }

    public function privilege(){
        switch ($this->session['userPrivilege']){
            case 1:{
                return 1;
            }
            case 2:{
                return 2;
            }
            case 3:{
                return 3;
            }
            default:{
                return 'd';
            }
        }
    }
}