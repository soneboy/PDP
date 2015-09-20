<?php require_once('database.php');?>
<?php
class Mostseracheduser{

    public $name;
    public $img;

    public function __construct(){

       $sql = 'SELECT name FROM githubusers';
       $name_array = [];
       $connect = new Database($username="",$password="");
       $connect->connect();
       $result = $connect->db->query($sql);

       while($row = $result -> fetch(PDO::FETCH_ASSOC)){

           $this -> name = $row['name'];
           array_push($name_array,  $this -> name);
        }

        $maxvalue = max(array_count_values($name_array));
        $maxUser = array_search($maxvalue, array_count_values($name_array));

        $sql2 = "SELECT img FROM githubusers WHERE name='{$maxUser}'";
        $result2 = $connect->db->query($sql2);

        while($row = $result2 -> fetch(PDO::FETCH_ASSOC)){

            $this -> img = $row['img'];
        }

        $localObject = new stdClass();
        $localObject -> mostlysercheduser = $maxUser;
        $localObject -> serchedtimes = $maxvalue;
        $localObject -> img = $this -> img;

        echo json_encode($localObject);

   }
}

$test = new Mostseracheduser();

?>