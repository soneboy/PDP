myPanel.controller('adminsControllers', function($log,$http,$scope,github, $timeout){
    
    $scope.showAdminUnique = false;
    $scope.showAlert = false;
    $scope.showForm = false;
    $scope.showAdmins = true;
    
    
    $scope.changeBox = function(){
        
 
        $scope.showForm = true;
        $scope.showAdmins = false;
        $scope.showAdminUnique = false;
    };
    
    $scope.admin = {};
    
    $scope.addAdmins = function(){
        console.log($scope.admin);
        github.searchUsers('../classes/admins.php',$scope.admin);
        
        $scope.showAlert = true;
        $scope.showForm = false;
        
        $timeout(function(){
            $scope.showAlert = false;
            $scope.showAdmins = true;
        }, 2000); 
    };
    
    $scope.searchAdmins = function(username){
        
        $scope.showAlert = false;
        $scope.showForm = false;
        $scope.showAdminUnique = true;
        $scope.showAdmins = false;
        $scope.showUsername = username;
        github.searchUsers('../classes/uniqueAdmin.php',username).then(function(showAdmin){
            
            $scope.showUniqueAdmin = showAdmin.data;
            console.log($scope.showUniqueAdmin);
        });
        
    };
    
        github.users('admins.php').then(function(users){

        $scope.showAdmins = users;
        console.log($scope.showAdmins);
        
    });
    
   $scope.deleteAdmin = function(admin){
       
       if(confirm('Are you sure you want to delet user ' + admin + '?') === true){
           
           github.searchUsers('../classes/deleteAdmin.php', {admin: admin});
       };
   };
    

    


        
});