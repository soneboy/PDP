myApp.controller('searhController',function($scope, $http, $location, sharedProperties,$route){
    
$scope.search = function(username) {
      

        if (username === undefined) {
            alert('Please provide your username!');
            return false;
            // $scope.message = 'Please enter your github username!';

        }
       

        else{
            
            $http.get('https://api.github.com/users/' + username).then(function(response){
            //sharedProperties.setProperty(response.data);
            var userData = response.data;
            
            var url = 'admin/classes/githubusers.php/getUsers';

            var data = {
            name: userData.login,
            reponumber: userData.public_repos,
            created: userData.created_at,
            updated: userData.updated_at,
            img: userData.avatar_url
        };
       // console.log(data);
        $http({
            method:'POST',
            url: url,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
           
        });
            $location.path('/user').search('username', username);                
            }, function(errorrResponse) {
                console.log(username);
                
                var searchedUser = errorrResponse.data.message;
                
                alert('User' + username + ' ' + searchedUser);
                $route.reload();
            });
         
        }

        return $scope.username = username;
        
}
    });


