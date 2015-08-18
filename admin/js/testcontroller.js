var myApp = angular.module('myApp', []);

myApp.controller('myController', function($scope,$http){

    $http.get('../classes/githubusers.php').then(function(response){

        $scope.friends = response.data;
        console.log($scope.friends);

    });
});