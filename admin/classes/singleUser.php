<?php require_once('database.php');?>

<?php

class Singleuser{

    public $name;
    public $date_visited;
    public $ip;

    public function __construct(){

        $postdata = file_get_contents("php://input");
        if($postdata != ''){

            $request = json_decode($postdata);
        }

        $sql="SELECT name,date_visited,ip FROM githubusers WHERE name='{$request -> name}'";
        $connect = new Database($username="",$password="");
        $connect->connect();
        $result = $connect->db->query($sql);

        $name_array = [];
        $date_visited_array = [];
        $ip_array = [];

        while($row = $result -> fetch(PDO::FETCH_ASSOC)){

           $this->name = $row['name'];
           $this->date_visited = $row['date_visited'];
           $this->ip = $row['ip'];

            array_push($name_array, $this->name);
            array_push($date_visited_array,  $this->date_visited);
            array_push($ip_array,  $this->ip);

        }

        $json_array = [];
        $local_array=[];
        $local_object = new stdClass();
        $local_object -> name = $this -> name;
        $local_object -> searchedtimes = sizeof($name_array);


        for($i = 0; $i < sizeof($name_array); $i++){

            $userObject = new stdClass();
            $userObject -> date = $date_visited_array[$i];
            $userObject -> ip = $ip_array[$i];
            array_push($local_array, $userObject);
        }

        $local_object -> userdata = $local_array;
        array_push($json_array, $local_object);
        echo json_encode($json_array);
    }
}

$test = new Singleuser();

?>