var myApp = angular.module('MyApp', ['ngSanitize', 'ui.bootstrap']);

myApp.controller('newController', function($scope, $http, $location, $anchorScroll) {

    $scope.gotoAbout = function() {

        $location.hash('about');
        $anchorScroll();
    }

    $scope.gotoRepos = function() {

        $location.hash('repos');
        $anchorScroll();
    }

    $scope.gotoSingleRepo = function() {

        $location.hash('singleRepo');
        $anchorScroll();
    }

    var getGithub = function(response) {

        $scope.user = response.data;

        if ($scope.user) {

            $scope.userDiv = true;

        }
        if ($scope.user.login == 'undefined') {
            $scope.message = 'Please enter your username!';
        }

        $scope.fullName = response.data.name ? '<p>Full name : ' + response.data.name + '</p>' : '<p class="redText"> Full name : Not provided at github!</p>';
        $scope.userLocation = response.data.location ? '<p> Location : ' + response.data.location + '</p>' : '<p class="redText"> Location : Not provided at github!</p>';
        $scope.userCompany = response.data.company ? '<p> Company : ' + response.data.company + '</p>' : '<p class="redText"> Company : Not provided at github!</p>';
        $scope.userEmail = response.data.email ? '<p> Email : ' + response.data.email + '</p>' : '<p class="redText"> Email : Not provided at github!</p>';

        var url = 'admin/classes/githubusers.php/getUsers';

        var data = {
            name: $scope.user.login,
            reponumber: $scope.user.public_repos,
            created: $scope.user.created_at,
            updated: $scope.user.updated_at,
            img: $scope.user.avatar_url
        };
       // console.log(data);
        $http({
            method:'POST',
            url: url,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            console.log(data);
        });

        console.log($scope.user);
        $http.get($scope.user.repos_url).then(repos);
    };

    var repos = function(response) {

        $scope.repository = response.data;
        //console.log($scope.repository.length);

        $scope.totalItems = $scope.repository.length;
        console.log($scope.totalItems);
        $scope.currentPage = 1;
        $scope.numPerPage = 10;

        $scope.paginate = function(value) {
            var begin, end;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.repository.indexOf(value);
            return (begin <= index && index < end);
        };
    };

    $scope.search = function(username) {
        $scope.commitDetails = 'false';
        $scope.repoOverview = 'false';

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

            $http.get('https://api.github.com/users/' + username + '/gists').then(function(response) {
                $scope.gists = response.data;
                console.log($scope.gists);
            });

            setTimeout(function(){
                $location.hash('about');
                $anchorScroll();
            }, 1000);

        }

        return $scope.username = username;
    };

    $scope.showRepo = function(selectRepo) {

        console.log(selectRepo);

        $http.get('https://api.github.com/repos/' + $scope.username + '/' + selectRepo.name).then(function(response) {
            $scope.singleRepo = response.data;
            console.log($scope.singleRepo);
        });

        $http.get('https://api.github.com/repos/' + $scope.username + '/' + selectRepo.name + '/commits').then(function(response) {
            $scope.commits = response.data;
            console.log($scope.commits);
        });

        $http.get('https://api.github.com/repos/' + $scope.username + '/' + selectRepo.name + '/git/trees/master?recursive=1').then(function(response) {

            var files = response.data.tree;
            console.log(files);

            var filesArray = [];
            var foldersArray = [];
            var filesCompare = [];
            var testArray = [];
            var folderCompare = [];

            for (var i = 0; i < files.length; i++) {

                filesArray.push(files[i].path);

                if (filesArray[i].indexOf('/') >= 0) {

                    foldersArray.push('<i class="fa fa-folder"></i>' + filesArray[i].substring(0, filesArray[i].indexOf('/')) + '<br/>');
                    folderCompare.push(filesArray[i].substring(0, filesArray[i].indexOf('/')));
                    testArray.push(filesArray[i]);
                    // filesArrayIcon =  filesArray.splice(testArray[i]);
                }
            }
            console.log(testArray);
            console.log(foldersArray);

            $scope.showFolders = jQuery.unique(foldersArray).join("");
            filesCompare = filesArray.filter(function(value) {
                return testArray.indexOf(value) < 0;
            });
            var newArray = [];
            newArray = filesCompare.filter(function(value) {
                return folderCompare.indexOf(value) < 0;
            });

            var showFiles = [];
            for (var j = 0; j < newArray.length; j++) {
                showFiles.push('<i class="fa fa-file-text-o"></i>' + newArray[j] + '<br/>');
            }
            $scope.showJoinedFiles = showFiles.join("");

            console.log($scope.showFiles);
        });

        $scope.repoOverview = 'true';
        $scope.commitDetails = 'true';
    }
    $scope.sortType = 'id';
    $scope.sortReverse = false;

});