<?php require_once('database.php');?>
<?php
    
class Deleteadmin{
    
    public $id;
    public $responseMessage;
    public function __construct(){
        
         $postdata = file_get_contents("php://input");
         if($postdata != ''){
               $request = json_decode($postdata);
               
               $connect = new Database($username="",$password="");
               $connect -> connect();
               $sql = "SELECT  id FROM users WHERE username='{$request->admin}'";
               $result = $connect->db->query($sql);
              
               while($row = $result -> fetch(PDO::FETCH_ASSOC)){
                   
                   $this -> id = $row['id'];
               }
               
               $sql2= "DELETE users,admins FROM users INNER JOIN admins WHERE users.id=admins.admin_id AND users.id='{$this->id}'";
               $connect->db->query($sql2);
               
               
             
               if($connect->db->query($sql2) != false){
                   $this -> responseMessage = "User has been successfuly deleted from database";
                   echo json_encode($this -> responseMessage);
               }
               else{
                    $this -> responseMessage = "Something wen wrong";
                   echo json_encode($this -> responseMessage);
                   
               }
               
         }
    }
               }


$test = new Deleteadmin();
?>