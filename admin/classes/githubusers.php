<?php require_once('database.php');?>
<?php
class Githubusers{

    public $id;
    public $name;
    public $repos;
    public $created;
    public $updated;
    public $img;
    public $ip;

    //function to get users from UI and insert in database
    public function getUsers(){
        

        $this -> ip = $_SERVER['REMOTE_ADDR'];
        $postdata = file_get_contents("php://input");
        
        if($postdata != '') {
            $request = json_decode($postdata);
            $this->insertUsers($request->name, $request->reponumber, $request->created, $request->updated, $request->img, $this->ip);
        }
    }
  //function to insert users into DB
  private function insertUsers($name, $repos,$created,$updated,$img,$ip){


      $connect = new Database($username="",$password="");

      $connect->connect();

      $sql = "INSERT INTO githubusers(name,repos,created,updated,img,date_visited,ip) VALUES('{$name}',{$repos},'{$created}','{$updated}','{$img}', NOW(), '{$ip}')";
      $connect->db->query($sql);
  }


  public function test(){
        
       
        $test1 = $_SERVER['REMOTE_ADDR'];
        echo $test1;
  }
}
$test = new Githubusers();
//$test -> showGithubUsers();
$test ->getUsers();
//$test -> test();

?>

