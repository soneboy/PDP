<?php

class Uploadphoto{
    
    
    public function __construct() {
        
  
            
            $file = isset($_FILES['file']) ? $_FILES['file']['tmp_name'] : 'njesraaa';
            echo $file;
        
       
    
   }
 }
 
$test = new Uploadphoto();

?>

