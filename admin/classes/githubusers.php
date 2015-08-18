<?php require_once('database.php');?>
<?php
class Githubusers{

    public $id;
    public $name;
    public $repos;
    public $created;
    public $updated;
    public $img;

    public function getUsers(){

        $postdata = file_get_contents("php://input");
        if($postdata != '') {
            $request = json_decode($postdata);
            $this->insertUsers($request->name, $request->reponumber, $request->created, $request->updated, $request->img);
        }
    }

  private function insertUsers($name, $repos,$created,$updated,$img){

      $connect = new Database($username="",$password="");

      $connect->connect();

      $sql = "INSERT INTO githubusers(name,repos,created,updated,img,date_visited) VALUES('{$name}',{$repos},'{$created}','{$updated}','{$img}', NOW())";
      $connect->db->query($sql);
  }

  public function showGithubUsers(){

      $sql="SELECT * FROM githubusers ORDER BY id DESC";
      $connect = new Database($username="",$password="");
      $connect->connect();
      $result = $connect->db->query($sql);
      while($row = $result -> fetch(PDO::FETCH_ASSOC)){
            $jsonVar[] = $row;
      }

      echo json_encode($jsonVar);
      //var_dump($jsonVar);
  }
}
$test = new Githubusers();
$test -> showGithubUsers();
$test ->getUsers();

?>

