<?php require_once('database.php');?>
<?php  

class Login extends Database{
    

public function __construct(){

         $postdata = file_get_contents("php://input");
         $session = new stdClass();
         
        if($postdata != '') {
            
            $login = json_decode($postdata);
            
            $sql="SELECT * FROM users WHERE username='{$login->username}' AND password='{$login->password}'";
            $this->connect();
            $row = $this->db -> query($sql) -> rowCount();
            
            if($row > 0){
                session_start();
                $_SESSION['username'] = $login->username;
                
               }
               elseif($row === 0){
                   
                   $session -> isStarted = false;
                   $session -> message = "User with username ".$login->username." doesn`t exists.";
                   echo json_encode($session);
               }
              
              if(isset($_SESSION['username'])){
                        
                    $session -> isStarted = true;
                    echo json_encode($session);
                    } 
                    
        }
        else{
            session_start();
            
            if(!isset($_SESSION['username'])){
            $session -> isStarted = false;
            echo json_encode($session);
            
            }
            else{
                $session -> isStarted = true;
                $session -> username = $_SESSION['username'];
                echo json_encode($session);
            }
            
        }
       
    }    
}

$test = new Login();
?>