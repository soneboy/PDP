var myPanel = angular.module('MyPanel', []);

myPanel.controller('panelCotroller', function($scope, $http) {

$http.get('../classes/githubusers.php').then(function(response){

    $scope.gitUsers = response.data;
    console.log($scope.gitUsers.length);

    var dataDB = [];
    for(var i = 0; i< $scope.gitUsers.length; i++) {
        if (i % 4 == 0) {
            dataDB.push([]);
        }
        dataDB[dataDB.length - 1].push($scope.gitUsers[i]);
    }
    $scope.newUsers = dataDB;
    console.log($scope.newUsers);
   });
});

