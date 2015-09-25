myPanel.controller('adminsControllers', function($scope,github){
    
    $scope.showAlert = false;
    $scope.showForm = false;
    $scope.showAdmins = true;
    
    
    $scope.changeBox = function(){
        
 
        $scope.showForm = true;
        $scope.showAdmins = false;
    };
    
    $scope.admin = {};
    $scope.addAdmins = function(){
        console.log($scope.admin);
        github.searchUsers('../classes/admins.php',$scope.admin);
        
        $scope.showAlert = true;
        $scope.showForm = true;
        
    
        
    };
    /*
    github.users('admins.php').then(function(users){

        $scope.test = users;
        console.log( $scope.test);
        
    });
    */
});