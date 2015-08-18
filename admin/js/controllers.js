var myPanel = angular.module('MyPanel', ['ngAnimate', 'ui.bootstrap']);

myPanel.controller('panelCotroller', function($scope, $http) {

$http.get('../classes/githubusers.php').then(function(response){

    $scope.gitUsers = response.data;
    console.log($scope.gitUsers);

   });

$scope.addFilter = function(searchText){

    var getDate = new Date(searchText);
    $scope.filterResult = getDate.format('yyyy-mm-dd');
    console.log($scope.filterResult);


}

});


