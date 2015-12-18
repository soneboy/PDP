<?php require_once('database.php');?>
<?php

class Showgithubusers{
    
        
          //function to show users on Admin
   public function showGithubUsers(){
      
      $shovAll = file_get_contents("php://input");
      
      
      if($shovAll != ''){
          
          $showAllCheck = json_decode($shovAll);
          if($showAllCheck -> showAll = true){
              
              $sqlVariable = "";
          }
      }else{
          
          $sqlVariable = "LIMIT 51";
      }
      $sql = "SELECT * FROM githubusers ORDER BY id DESC {$sqlVariable}";
      $connect = new Database($username="",$password="");
      $connect->connect();
      $result = $connect->db->query($sql);
      while($row = $result -> fetch(PDO::FETCH_ASSOC)){
            $jsonVar[] = $row;
      }

      print_r(json_encode($jsonVar));
      //var_dump($jsonVar);
  
    }
}

$test = new Showgithubusers();

