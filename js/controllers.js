var myApp = angular.module('MyApp', []);

myApp.controller('newController', function($scope, $http, $anchorScroll, $location) {

    $scope.actions = [{
        id: 1,
        name: 'Serch Users'
    }, {
        id: 2,
        name: 'Serch Repos'
    }];



    $scope.changeAction = function(selectedAction){

        if(selectedAction.id == 1){
            $scope.showUserDiv = true;
            $scope.showRepoDiv = false;
        }
        else if(selectedAction.id == 2){
            $scope.showUserDiv = false;
            $scope.showRepoDiv = true;
        }
        else{
            $scope.showUserDiv = false;
            $scope.showRepoDiv = false;
        }
    };

    var getGithub = function(response) {

        $scope.user = response.data;

        if ($scope.user) {

            $scope.userDiv = true;
            $scope.noContentDiv = false;

        }
        if ($scope.user.login == 'undefined') {
            $scope.message = 'Please enter your username!';
        }
        if (typeof $scope.user.name == 'undefined') {
            $scope.user.name = 'Not provided at github';
        }

        $location.hash('generalOverview');
        $anchorScroll();
        console.log($scope.user);
        $http.get($scope.user.repos_url).then(repos);
    };

    var getRepo = function(response){

        $scope.userRepo = response.data;
        if($scope.userRepo){
            $scope.userDiv = false;
            $scope.repoDiv = true;
        }
        console.log($scope.userRepo);
    };
    var repos = function(response) {

        $scope.repository = response.data;
        console.log($scope.repository);
    };


    $scope.search = function(username) {
        if (username == undefined) {
            alert('Please provide your username!');
            return false;
            // $scope.message = 'Please enter your github username!';

        } else {
            $scope.message = '';
            $http.get('https://api.github.com/users/' + username).then(getGithub, function() {
                console.log(username);
                $scope.message = 'User ' + username + ' doesnt exist at Github';
            });
        }
    };

    $scope.searchrepo = function(username,repo){

        $http.get('https://api.github.com/repos/' + username + '/' + repo).then(getRepo);

       // console.log(repo);
    }
});

