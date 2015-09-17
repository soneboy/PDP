<?php require_once('database.php');?>
<?php

class UniqueUsers{

    public $name;

    public function __construct(){

        $sql = "SELECT * FROM githubusers";
        $connect = new Database($username="",$password="");
        $connect->connect();
        $result = $connect->db->query($sql);
        $nameArray = [];
        while($row = $result -> fetch(PDO::FETCH_ASSOC)){
            $this -> name = $row['name'];
            array_push($nameArray,  $this -> name);
        }

        $uniqueNameArray = [];
        $uniqueNameArray = array_unique($nameArray);
        print_r(json_encode($uniqueNameArray));
    }
}

$test = new UniqueUsers();



?>