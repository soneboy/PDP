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

    public function login(){

        $sql="SELECT * FROM users WHERE username='{$this->username}' AND password='{$this->password}'";
        //$this->connect();
        $this->connect();
        $row = $this->db -> query($sql) -> rowCount();
        if($row > 0){
            $_SESSION['username'] = $this->username;
            header('Location: ui/index.html');
        }
        else{
            $this->message = 'Invalid username or password';
        }
        //var_dump($row);
    }

}

?>