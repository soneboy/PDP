<?php require_once('database.php');?>
<?php

class Admins{
    
    public $id;
    public $username;
    public $password;
    public $admin_id;
    public $name;
    public $last_name;
    public $email;
    public $date_of_birth;
    public $adress;
    public $city;
    public $state;
    public $usernames = [];

    
    public function __construct() {
        

     $postdata = file_get_contents("php://input");
     
        if($postdata != '') {
            
            $request = json_decode($postdata);
            
              $connect = new Database($username="",$password="");
              $connect ->connect();
              
              $sqlCheck = "SELECT * FROM users WHERE username='{$request -> username}'";
              $checkResult = $connect->db->query($sqlCheck)->rowCount();
              
              $errorMsg = new stdClass();
              
              if($checkResult >= 1){
                  
                  $errorMsg -> message = "This username is already taken!";
                  $errorMsg-> value = false;
                  echo json_encode($errorMsg);
              }
              else{
            
            $sql = "INSERT INTO users(username,password) VALUES('{$request -> username}','{$request -> password}')";
          
            $connect->db->query($sql);
            $this -> findAdminId($request -> username);
            
            $sql2 = "INSERT INTO admins(admin_id,name,last_name,email,date_of_birth,adress,city,state) VALUES({$this ->id},'{$request ->name}','{$request ->lastname}','{$request ->email}','{$request ->dateofbirth}','{$request ->address}','{$request ->city}','{$request -> state}')";
            $connect->db->query($sql2);
                
                  $errorMsg -> message = "New admin has been added to database";
                  $errorMsg-> value = true;
                  echo json_encode($errorMsg);
                    }
               
            }
            else{
           
            $sql = "SELECT * FROM admins";
            $connect = new Database($username="",$password="");
            $connect->connect();
            $result = $connect->db->query($sql);
            $users_array = [];
            $this -> getUsernames();
            echo json_encode($this-> usernames);
           
        }           
    }
    
    private function findAdminId($username){
        
        $sql = "SELECT  id FROM users WHERE username='{$username}'";
        $connect = new Database($username="",$password="");
        $connect -> connect();
        $result = $connect->db->query($sql);
        while($row = $result -> fetch(PDO::FETCH_ASSOC)){
            
            $this -> id = $row['id'];
        }
    }
    
    private function getUsernames(){
        
        $sql = "SELECT username FROM users";
        $connect = new Database($username="",$password="");
        $connect->connect();
        $result = $connect->db->query($sql);
        while($row = $result -> fetch(PDO::FETCH_ASSOC)){
          
          array_push($this -> usernames, $row['username']);
        }
        
    }
}

$test = new Admins();

