<?php
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    session_start();
    $_SESSION['user'] = [];
    array_push($_SESSION['user'], 'test2');
    array_push($_SESSION['user'], 'test3');
    //array_push($_SESSION['users'], $request->user);
    print_r($_SESSION['user']);
?>
<?php
class Photos extends Database{

    public $id;
    public $name;
    public $type;
    public $size;
    public $date;
    public $tmp_path;
    public $error;

    public function dispaly_errors(){

        switch ($this->error) {
            case '1':
                echo "File is to large!";
                break;
            case '2':
                echo "File exceed maximum file size";
                break;
            case '3':
                echo "Error ocurred: partial upload1";
                break;
            case '4':
                echo "Error ocurred: no file provided";
                break;
            case '5':
                echo "Error ocurred: no temporary folder";
                break;
            case '6':
                echo "Error ocurred: failed to write to disc";
                break;
            case '7':
                echo "File extension failed";
                break;

        }
    }
    public function display_slider(){

        $sql="SELECT id,name FROM photos ";
        $sql.="WHERE img_navigacija_id=1 ORDER BY id ASC";


        foreach(self::$connect->query($sql) as $row){
            echo "<img src=\"uploaded_images/".$row['name']."\"/>";
        }
    }
    public function display_slider_for_admin(){

        $sql="SELECT id,name FROM photos ";
        $sql.="WHERE img_navigacija_id=1";


        echo "<table><tr>";
        foreach(self::$connect->query($sql) as $row){



            $this->id=$row['id'];
            $this->name=$row['name'];
            echo "<td><img src=\"../uploaded_images/".$this->name."\"/></td>";
            echo "<td><form method=\"post\" enctype=\"multipart/form-data\"> ";
            echo "<input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"5500000\" />";
            echo "<input type=\"file\" name=\"file_upload\" />";
            echo "<button type=\"submit\" name=\"".$this->id."\"><i class=\"fa fa-pencil\"></i></button></form></td></tr>";
            if(isset($_POST[$this->id])){

                $file=array();
                $file=isset($_FILES['file_upload'])?$_FILES['file_upload']:null;
                $this->name=$file['name'];
                $this->type=$file['type'];
                $this->tmp_path=$file['tmp_name'];
                $this->error=$file['error'];
                move_uploaded_file($this->tmp_path, '/'.$this->name);
                if($this->error > 1){
                    echo "<p>";
                    $this->dispaly_errors();
                    echo "</p>";
                }
                elseif( $this->type!="image/jpeg" &&
                    $this->type!="image/png"  &&
                    $this->type!="image/gif"){

                    echo "File ".$this->name." is not image file,please upload only images!";

                }
                else{
                    $this->edit_slider();
                }
            }
        }
    }

    public function edit_slider(){


        $sql="UPDATE photos SET ";
        $sql.="name='{$this->name}' ";
        $sql.="WHERE id=".$this->id;
        self::$connect->query($sql);
        header('Location: panel.php?id=homepage&page_id=2');

    }
    public function upload_photo(){

        // Defining function to insert images into database,called in panel.php
        $sql="INSERT INTO photos ";
        $sql.="(name,size,type,date,img_navigacija_id) VALUES ('{$this->name}',$this->size,'{$this->type}',NOW(),2)";
        self::$connect->query($sql);


    }
    public function move_photo(){

        // Moving uploaded images into uploaded_images folder
        move_uploaded_file($this->tmp_path, '/home/a1031316/public_html/uploaded_images/'.$this->name);

    }
    public function check_image(){

        //Function to check if uploaded image already exists in database
        $sql="SELECT * FROM photos";
        $sql.=" WHERE name='{$this->name}' ";

        $row=self::$connect->query($sql)->rowCount();
        if($row>=1){
            return true;
        }
    }
    public function count_homepage_photos(){

        // We are counting photos,because we don`t want to insert more than 9 photos in DB
        $sql="SELECT COUNT(*) FROM photos WHERE img_navigacija_id=2";
        $result=self::$connect->query($sql);
        while($row=$result->fetch(PDO::FETCH_NUM)){
            return $row[0];
        }
    }

    public function homepage_gall($homepage){

        $sql = "SELECT name FROM photos WHERE img_navigacija_id=2 LIMIT 9";

        echo '<table><tr>';
        $i = 0;
        foreach (self::$connect->query($sql) as $row) {
            $i++;
            $this->name=$row['name'];
            // Making different path,depends on place where function is called,panel.php or homepage.php
            if ($i % 3 === 1) {
                echo '</tr><tr>';
            }
            if ($homepage) {
                echo "<td><img src=\"../uploaded_images/".$this->name."\"/></td>";
            } else {
                echo "<td><img src=\"uploaded_images/".$this->name."\"/></td>";
            }
        }
        echo '</tr></table>';
    }
    public function display_gall_for_admin(){
        // Function to display front page gallery in admin panel

        $sql = "SELECT id,name FROM photos WHERE img_navigacija_id=2 LIMIT 9";

        echo "<table><tr>";
        $i=0;
        $rows=array();
        foreach(self::$connect->query($sql) as $row){

            $rows[]=$row;
        }

        foreach($rows as $row){
            $i++;
            if($i % 3==1){
                echo "</tr><tr>";
            }
            $this->id=$row['id'];
            $this->name=$row['name'];
            echo "<td id=\"fade\"><img src=\"../uploaded_images/".$this->name."\"/></td>";
            echo "<td style>".$row['name']."<br/>";
            echo "<a id=\"test\" href=\"delete_photo.php?id=".$this->id."&name=".$this->name."\"><i class=\"fa fa-trash-o\"> Delete</i></a></td>";
        }
        echo "</table>";

    }
    public function delete_photo(){

        //Delete photo from gallery
        $sql="DELETE FROM photos WHERE id=".$this->id;
        self::$connect->query($sql);

    }
    public function delete_file(){

        // Delete file from folder
        unlink('/opt/lampp/htdocs/specijalisticki_rad/uploaded_images/'.$this->name);

    }

    public function show_column_photos(){

        // Function to show featured photo on frontpage column
        $sql="SELECT * FROM photos WHERE img_navigacija_id=3";
        $result=self::$connect->query($sql);
        $rows=array();
        while($row=$result->fetch(PDO::FETCH_ASSOC)){
            $rows[]=$row;
            $this->name=array_column($rows, 'name');
            $this->id=array_column($rows, 'id');
        }

    }
    public function change_column_photo($id){

        $sql="UPDATE photos SET name='{$this->name}' ";
        $sql.="WHERE id={$id}";
        self::$connect->query($sql);

    }
    public static function show_logo(){

        $sql="SELECT value FROM settings ";
        $sql.="WHERE name='logo' ";

        foreach(self::$connect->query($sql) as $row){
            echo $row['value'];
        }
    }
    public static function change_logo($value,$path){
        $sql="UPDATE settings SET ";
        $sql.="value='{$value}' WHERE name='logo' ";
        self::$connect->query($sql);
        move_uploaded_file($path, '/home/a1031316/public_html/img/'.$value);
    }
}














