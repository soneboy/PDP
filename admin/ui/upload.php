
<!DOCTYPE html>
<html>
<body>

<form action="" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>
    
    <?php
    
    if(isset($_POST['submit'])){
        
        $file = isset($_FILES['fileToUpload']) ? $_FILES['fileToUpload'] : [];
        echo '<pre>';
        print_r($file);
        echo '</pre>';
    }
    
    
    
    ?>

</body>
</html> 