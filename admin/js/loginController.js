var myLogin = angular.module('loginApp',[]);

myLogin.controller('loginController', function($scope,$http,$location){
    
    $scope.login = function(){
        
       $http({
                method: 'POST',
                url: 'classes/login.php',
                data: $scope.userLogin
            })
             .then(function(response){
                 
                 var isSession = response.data;
                 console.log(isSession);
                 if(isSession.isStarted === true){
                     
                     window.location = "http://localhost/PDP/admin/ui/index.html";
                     ;
                 }
                 
                 if(isSession.message){
                     
                     alert(isSession.message);
                 }
            });
    };
});

