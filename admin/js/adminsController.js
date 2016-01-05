myPanel.controller('adminsControllers', function($log, $http, $scope, Upload, github, $timeout, $route, $rootScope, $location, $anchorScroll){
     
    github.users('admins.php').then(function(users){
        
    $scope.showAdminsData = users;
});
    
        $scope.previewFile = function(){
      
        var getImg = document.getElementById('findSrc');
        var getInput = document.getElementById('uploadFile').files[0];
        
        var reader  = new FileReader();

         reader.onloadend = function () {
         getImg.src = reader.result;
         
           };

         if(getInput){
             
         reader.readAsDataURL(getInput);
         
         }
         else {
         getImg.src = "";
         }
     };
     
    $scope.upload = function(file){
        
        if(file){
            
            var fileExtension = file.name.substring(file.name.indexOf('.'), file.name.length);
        
            if(fileExtension !== '.jpg' && fileExtension !== '.png' && fileExtension !== '.gif'){
            alert('Please upload only photo file!');
            }
            else{
                
               Upload.upload({
               url: '../classes/uploadPhoto.php',
               data: {file: file, 'username': $scope.usernameFile}
           }).then(function(resp) {
            
           $scope.uploadedPhoto = resp.data;

        });
    };
  }
};
       function showUniqueAdmin(admin){
            
        $scope.showAdmins = false;
        $scope.showUniqueAdminBox = true;
        $scope.addButton = false;
        $scope.showUsername = admin;

        github.searchUsers('../classes/uniqueAdmin.php',admin).then(function(showAdmin){
            
            $scope.showUniqueAdminApi = showAdmin.data;
            console.log($scope.showUniqueAdminApi);
        });
    }  
    
if($location.search().hasOwnProperty('username')){
    
    $scope.usernameCurrent = $location.search().username;
    showUniqueAdmin($scope.usernameCurrent);
}
else{

   $scope.showAdmins = true;
   $scope.addButton = true;
   
   $scope.changeBox = function(){
       
        if($scope.showAdminsData.length >= 6){
            
            alert('You can`t create more than 6 admins!');
            $route.reload();
        }
        
        $scope.showForm = true;
        $scope.addButton = false;
        $scope.showAdmins = false;
        $scope.addButton = false;
        $scope.showAdminUnique = false;
    };
    
    $scope.admin = {};
    
    $scope.addAdmins = function(){
        
        if(typeof $scope.uploadedPhoto === 'undefined'){
            alert('Please upload photo!');
        }
        else{
        
        $scope.admin.name = $scope.admin.name ? $scope.admin.name : '';
        $scope.admin.lastname = $scope.admin.lastname  ? $scope.admin.lastname  : 'Not provided';
        $scope.admin.dateofbirth = $scope.admin.dateofbirth  ? $scope.admin.dateofbirth  : 'Not provided';
        $scope.admin.address = $scope.admin.address  ? $scope.admin.address  : 'Not provided';
        $scope.admin.city = $scope.admin.city  ? $scope.admin.city  : 'Not provided';
        $scope.admin.state = $scope.admin.state ? $scope.admin.state   : 'Not provided';
        $scope.admin.imageName = $scope.uploadedPhoto.name;
        $scope.admin.tmPath =   $scope.uploadedPhoto.tmp;

        
        github.searchUsers('../classes/admins.php',$scope.admin).then(function(usersResponse){
            
            $scope.newUserResponse = usersResponse.data;
         
           // console.log($scope.newUserResponse);
            if($scope.newUserResponse.value === false){
                
                 $scope.showFail = true;
                 $scope.showForm = false;
                 
                      $timeout(function(){
                        
                          $scope.showFail = false;
                          $scope.showForm = true;
                        
              }, 2000); 
            }
            else{
                    $scope.showSuccess = true;
                    $scope.showFail = false;
                    $scope.showForm = false;
                    

         $timeout(function(){
            $route.reload();
            
               }, 2000); 
             }
        });
      }
    };
    
    $scope.searchAdmins = function(username){
        
        showUniqueAdmin(username);
    };
    
            $scope.deleteAdmin = function(admin){
       
 
       if(confirm('Are you sure you want to delete user ' + admin + '?') === true){
           
           github.searchUsers('../classes/deleteAdmin.php', {admin: admin}).then(function(response){
               
               $scope.deletedAdmin = response.data;
               
               $scope.showUniqueAdminBox = false;
               $scope.showDeleteSucess = true;
               
               
                 $timeout(function(){
            $route.reload();
        }, 2000); 
               
           });
       };
  };
   
   $scope.back = function(){
       
       $route.reload();
   };
   
   $scope.messageBox = {
    "margin-top":"30px"
};
   
   $scope.cardStyle = {
    
    "float": "left",
    "margin": "30px",
    "background":"#FFF0F5",
    "padding": "15px"
    
   };
   
   $scope.lineStyle = {
       
       "clear":"both"
   };
}
   
});
