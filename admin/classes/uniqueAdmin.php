<?php require_once('database.php');?>
<?php

class uniqueAdmin{
    
    public function __construct() {
        
        $postdata = file_get_contents("php://input");
        
        if($postdata != ''){
         
        $sql = "SELECT id FROM users WHERE username='{$postdata}'";
        $connect = new Database($username="",$password="");
        $connect ->connect();
        $result = $connect->db->query($sql);
        
        while($row = $result -> fetch(PDO::FETCH_ASSOC)){
            
           $local_id = $row['id'];
        }
        
        $sql2="SELECT * FROM admins WHERE admin_id='{$local_id}'";
        $connect ->connect();
        $result = $connect->db->query($sql2);
        while($row=$result -> fetch(PDO::FETCH_ASSOC)){
            
            //$localUniqueAdmin = new stdClass();
            echo json_encode($row);
        }
        
        }
    }
}
$test = new uniqueAdmin();


?>

