myPanel.controller('adminsControllers', function($log, $http, $scope, Upload, github, $timeout, $route, $rootScope, $location){
    
    $scope.upload = function (file) {
        
        Upload.upload({
             url: '../classes/uploadPhoto.php',
             data: {file: file, 'username': $scope.usernameFile}
        }).then(function (resp) {
            
            $scope.uploadedPhoto = resp.data;
            
        });
    };
       
        function showUniqueAdmin(admin){
            
        $scope.showAlert = false;
        $scope.showForm = false;
        $scope.showAdmins = false;
        $scope.showUniqueAdminBox = true;
        $scope.addButton = false;
        $scope.showUsername = admin;
        github.searchUsers('../classes/uniqueAdmin.php',admin).then(function(showAdmin){
            
            $scope.showUniqueAdmin = showAdmin.data;
            console.log($scope.showUniqueAdmin);
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
        
        if($scope.showAdminsData.number >= 4){
            
            alert('You can`t create more than 4 admins!');
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
        
        
        $scope.admin.name = $scope.admin.name ? $scope.admin.name : '';
        $scope.admin.lastname = $scope.admin.lastname  ? $scope.admin.lastname  : 'Not provided';
        $scope.admin.dateofbirth = $scope.admin.dateofbirth  ? $scope.admin.dateofbirth  : 'Not provided';
        $scope.admin.address = $scope.admin.address  ? $scope.admin.address  : 'Not provided';
        $scope.admin.city = $scope.admin.city  ? $scope.admin.city  : 'Not provided';
        $scope.admin.state = $scope.admin.state   ? $scope.admin.state   : 'Not provided';
        $scope.admin.imageName = $scope.uploadedPhoto.name;
        $scope.admin.tmPath =   $scope.uploadedPhoto.tmp;
        console.log($scope.admin.tmPath);
        github.searchUsers('../classes/admins.php',$scope.admin).then(function(usersResponse){
            
            $scope.newUserResponse = usersResponse.data;
            
            if($scope.newUserResponse.value === false){
                
                $scope.showAlert = true;
                var getElement = document.getElementById('sucessOrFail');
                getElement.setAttribute('class','alert alert-danger');
            }
            else{
                   $scope.showAlert = true;
                   $scope.showForm = false;
        
         $timeout(function(){
            $route.reload();
        }, 2000); 
                
            }
        });
        
    };
    
    $scope.searchAdmins = function(username){
        
        
        showUniqueAdmin(username);
    };
    
    
        github.users('admins.php').then(function(users){
        
        var adminData = users;
        for(var i = 0; i < adminData.length; i++){
            
            $scope.showAdminsData = users[i].username;
            
        }
        console.log($scope.showAdminsData);
        
        
    });
    
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