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
    
    public function __construct() {
        

     $postdata = file_get_contents("php://input");
     
        if($postdata != '') {
            $request = json_decode($postdata);
            $sql = "INSERT INTO users(username,password) VALUES('{$request -> username}','{$request -> password}')";
            $connect = new Database($username="",$password="");
            $connect ->connect();
            $connect->db->query($sql);
            $this -> findAdminId($request -> username);
            
            $sql2 = "INSERT INTO admins(admin_id,name,last_name,email,date_of_birth,adress,city,state) VALUES({$this ->id},'{$request ->name}','{$request ->lastname}','{$request ->email}','{$request ->dateofbirth}','{$request ->address}','{$request ->city}','{$request -> state}')";
            $connect->db->query($sql2);
            }
        else{
           
            $sql = "SELECT * FROM admins";
            $connect = new Database($username="",$password="");
            $connect->connect();
            $result = $connect->db->query($sql);
            $users_array = [];
            
            while($row = $result -> fetch(PDO::FETCH_ASSOC)){
                      
                      $localObject = new stdClass();
                      $localObject -> name = $row['name'];
                      $localObject -> last_name = $row['last_name'];
                      $localObject -> email = $row['email'];
                      $localObject -> date_of_birth = $row['date_of_birth'];
                      $localObject -> adress  = $row['adress'];
                      $localObject -> city = $row['city'];
                      $localObject -> state = $row['state'];
                      array_push($users_array, $localObject);
                      echo json_encode($users_array);
            }
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
}

$test = new Admins();

