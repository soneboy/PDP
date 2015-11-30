<?php

class Logout{
    
    public function __construct(){
        
        session_start();
        $sessionStatus = new stdClass();
        
        if(isset($_SESSION['username'])){
            
            session_destroy();
            
            if(session_status() !== 'PHP_SESSION_ACTIVE'){
                
                $sessionStatus -> destroyed = true;
                echo json_encode($sessionStatus);
            }
        }
    }
}

$test = new Logout();
