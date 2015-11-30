<?php

class Database {

    public $username;
    public $password;
    public $db;
    public $message = '';

    public function __construct($username, $password){

        $this->username = $username;
        $this->password = $password;
    }

    public function connect(){

        try{
            $db = new PDO('mysql:host=localhost;dbname=pdp','root','');
        }
        catch(Exception $e){
            $error=$e->getMessage();
        }
        if(isset($error)){
            echo $error;
        }

        $this->db = $db;
    }

}

?>