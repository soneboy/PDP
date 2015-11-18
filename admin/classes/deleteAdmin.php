<?php require_once('database.php');?>
<?php
    
class Deleteadmin{
    
    public function __construct(){
        
         $postdata = file_get_contents("php://input");
         if($postdata != ''){
               $request = json_decode($postdata);
               
               $connect = new Database($username="",$password="");
               $connect -> connect();
               $sql = "DELETE * FROM admins WHERE username='{$request->admin}";
               $connect->db->query($sql);
         }
    }
               }


$test = new Deleteadmin();
?>