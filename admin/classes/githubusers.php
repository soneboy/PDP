<?php require_once('database.php');?>
<?php
class Githubusers{

    public function getUsers(){

        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $this->insertUsers($request->name, $request->reponumber);


  }
  private function insertUsers($name, $repos){

      $connect = new Database();

      $connect->connect();

      $sql = "INSERT INTO githubusers(name,repos) VALUES('{$name}', {$repos})";
      $connect->db->query($sql);
  }

}
$test = new Githubusers();
$test->getUsers();



?>