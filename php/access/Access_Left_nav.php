<?php
/**
 * Created by PhpStorm.
 * User: kundakchan
 * Date: 02.09.18
 * Time: 18:46
 */

namespace acc;


class Access_Left_nav
{
    private $session;
    private $url;
    public $result;

    public function __construct($session, $url){
        $this->session = $session;
        $this->url = $url;
        $this->result = $this->parserUrl();
    }

    private function parserUrl (){
        switch ($this->url['href']){
            case 'http://imsit/html/account/index.html':{
                if($this->session['userPrivilege'] === 3 || $this->session['userPrivilege'] === 2 || $this->session['userPrivilege'] === 1){
                    return 1;
                }
                else{
                    return 0;
                }
                break;
            }
            case 'http://imsit/html/users/index.html':{
                if($this->session['userPrivilege'] === 3){
                    return 1;
                }
                else{
                    return 0;
                }
                break;
            }
            case 'http://imsit/html/assigned_request/index.html':{
                if($this->session['userPrivilege'] === 3 || $this->session['userPrivilege'] === 2){
                    return 1;
                }
                else{
                    return 0;
                }

                break;
            }
            case 'http://imsit/html/actual_request/index.html':{
                if($this->session['userPrivilege'] === 3 || $this->session['userPrivilege'] === 2){
                    return 1;
                }
                else{
                    return 0;
                }

                break;
            }
            case 'http://imsit/html/request/request/index.html':{
                if($this->session['userPrivilege'] === 3 || $this->session['userPrivilege'] === 2 || $this->session['userPrivilege'] === 1){
                    return 1;
                }
                else{
                    return 0;
                }

                break;
            }
            case 'http://imsit/html/request/my_request/index.html':{
                if($this->session['userPrivilege'] === 3 || $this->session['userPrivilege'] === 2 || $this->session['userPrivilege'] === 1){
                    return 1;
                }
                else{
                    return 0;
                }

                break;
            }
            default:{
                 return 0;
            }
        }
    }


}