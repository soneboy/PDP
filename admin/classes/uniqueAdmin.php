<?php require_once('database.php');?>
<?php

class uniqueAdmin{
    public $local_id;
    public $img;
    public function __construct() {
        
        $postdata = file_get_contents("php://input");
        
        if($postdata != ''){
         
        $localUniqueAdmin = new stdClass();
        
        $sql = "SELECT id,img FROM users WHERE username='{$postdata}'";
        $connect = new Database($username="",$password="");
        $connect ->connect();
        $result = $connect->db->query($sql);

        while($row = $result -> fetch(PDO::FETCH_ASSOC)){
            
           $this -> local_id = $row['id'];
           $this -> img = $row['img'];
        }
        
        $sql2="SELECT * FROM admins WHERE admin_id='{$this -> local_id}'";
        $connect ->connect();
        $result = $connect->db->query($sql2);
        
        while($row=$result -> fetch(PDO::FETCH_OBJ)){
            
            $localUniqueAdmin = $row;
            $localUniqueAdmin -> img = $this->img;
            echo json_encode($localUniqueAdmin);
        }
        
        }
    }
}
$test = new uniqueAdmin();


?>

