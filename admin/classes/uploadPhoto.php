<?php

class Fileupload{
    
    public function __construct(){
        
        $fileObject = new stdClass();
        
        if(isset($_FILES['file'])){
  
             $fileObject  ->  name  = $_FILES['file']['name'];
             $fileObject  ->  type  = $_FILES['file']['type'];
             $fileObject  ->  tmp   = $_FILES['file']['tmp_name'];
             $fileObject  ->  error = $_FILES['file']['error'];
             $fileObject  ->  size  = $_FILES['file']['size'];
             
             $target_path = 'C:/xampp/htdocs/PDP/admin/ui/img/'.$fileObject  ->  name;
             move_uploaded_file($fileObject  ->  tmp, $target_path);
             echo json_encode($fileObject);
      }
    }
    
}

   $test = new Fileupload();

?>

