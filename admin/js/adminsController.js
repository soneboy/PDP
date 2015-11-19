myPanel.controller('adminsControllers', function($log,$http,$scope,github, $timeout,$route){
    
    (function(){
           
    $scope.showAdminUnique = false;
    $scope.showDeleteSucess = false;
    $scope.showAlert = false;
    $scope.showForm = false;
    $scope.showAdmins = true;
    
    })();

    
   $scope.changeBox = function(){
        
 
        $scope.showForm = true;
        $scope.showAdmins = false;
        $scope.showAdminUnique = false;
    };
    
    $scope.admin = {};
    
    $scope.addAdmins = function(){
        
      
        $scope.admin.name = $scope.admin.name ? $scope.admin.name : 'Not provided';
        $scope.admin.lastname = $scope.admin.lastname  ? $scope.admin.lastname  : 'Not provided';
        $scope.admin.dateofbirth = $scope.admin.dateofbirth  ? $scope.admin.dateofbirth  : 'Not provided';
        $scope.admin.address = $scope.admin.address  ? $scope.admin.address  : 'Not provided';
        $scope.admin.city = $scope.admin.city  ? $scope.admin.city  : 'Not provided';
        $scope.admin.state = $scope.admin.state   ? $scope.admin.state   : 'Not provided';

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
        
        $scope.showAlert = false;
        $scope.showForm = false;
        $scope.showUniqueAdminBox = true;
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
   
   (function(){
       
       var cardBox = $('div.card.card-block');
       
       console.log(cardBox[0]);
       for(var i=0; i<cardBox.length;i++){
           
           cardBox[i].style.padding = '15px';
       }
   })();
    
});