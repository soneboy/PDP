myPanel.controller('globalController', function($scope, $http, $location){
  
     angular.element(document).ready(function () {
        
         $http.get('../classes/login.php').then(function(response){
                 
                 $scope.isSession = response.data;
                 
                 if($scope.isSession.isStarted === false){
                     
                     window.location = 'http://localhost/PDP/admin';
                 }
            });
         
    });
    

    
   $scope.eventCall = function(){
       
          $scope.$broadcast('myCustomEvent', {
          someProp: 'Sending you an Object!' // send whatever you want
     });
   };
   
   $scope.logout = function(){
       
        $http.get('../classes/logout.php').then(function(response){
                 
                 var session = response.data;
                 if(session.destroyed === true){
                     
                     window.location.href = 'http://localhost/PDP/admin/';
                 }
             });
   };
   
   $scope.refresh = function(){
          
         console.log('tessstt');
   };
   
});

