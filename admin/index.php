<?php session_start();?>
<?php require_once('classes/database.php');?>
<html>
<head>
    <title>Login</title>
    <link href="admin.css" type="text/css" rel="stylesheet">
</head>
 <body>
 <div id="form-main">
     <div id="form-div">
         <?php

         if(isset($_POST['submit'])){

             $username = $_POST['username'] ? $_POST['username'] : null;
             $password = $_POST['password'] ? $_POST['password'] : null;

             $login = new Database($username, $password);
             $login -> login();
             echo '<p id=\'validate\'>'.$login-> message.'</p>';
         }
         ?>

         <form class="form" id="form1" method="post">

             <p class="name">
                 <input name="username" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Username" id="name" />
             </p>

             <p class="email">
                 <input name="password" type="text" class="validate[required,custom[email]] feedback-input" id="password" placeholder="Password" />
             </p>

             <div class="submit">
                 <input type="submit" name="submit" value="SEND" id="button-blue"/>
                 <div class="ease"></div>
             </div>
         </form>
     </div>
     <script src="js/validation.js" type="text/javascript"></script>
 </body>
</html>