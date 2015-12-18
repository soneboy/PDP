myApp.controller('mainController', function($scope, $http, $location, $anchorScroll, sharedProperties, $timeout) {




    $scope.gotoAbout = function() {

        $location.hash('about');
        $anchorScroll();
    };

    $scope.gotoRepos = function() {

        $location.hash('repos');
        $anchorScroll();
    };

    $scope.gotoSingleRepo = function() {

        $location.hash('singleRepo');
        $anchorScroll();
    };

     if($location.search().hasOwnProperty('username')){
    
     var usernameCurrent = $location.search().username;
    
}
$scope.usernameAdress = usernameCurrent;
      
       //$scope.userData = sharedProperties.getProperty();
        
       // console.log($scope.userData.login);
        
        $http.get('https://api.github.com/users/' + $scope.usernameAdress).then(function(response){
            
               $scope.userData = response.data;
               
               $scope.filteredUserData = {
                   
                  
                   fullName: $scope.userData.name ? '<p>Full name : ' + $scope.userData.name + '</p>' : '<p class="redText"> Full name : Not provided at github!</p>',
                   userLocation : $scope.userData.location ? '<p> Location : ' + $scope.userData.location + '</p>' : '<p class="redText"> Location : Not provided at github!</p>',
                   userCompany : $scope.userData.company ? '<p> Company : ' + $scope.userData.company + '</p>' : '<p class="redText"> Company : Not provided at github!</p>',
                   userEmail : $scope.userData.email ? '<p> Email : ' + $scope.userData.email + '</p>' : '<p class="redText"> Email : Not provided at github!</p>',
                   created_at : $scope.userData.created_at,
                   repos : $scope.userData.public_repos,
                   gists : $scope.userData.public_gists
            
            
        };
       
     
            
        
  
        
    
        
       
        $http.get($scope.userData.repos_url).then(function(response) {

        $scope.repository = response.data;
  

        $scope.totalItems = $scope.repository.length;

        $scope.currentPage = 1;
        $scope.numPerPage = 10;

        $scope.paginate = function(value) {
            var begin, end;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.repository.indexOf(value);
            return (begin <= index && index < end);
        };
    });
        
   
       $scope.showRepo = function(selectRepo) {

       

        $http.get('https://api.github.com/repos/' + usernameCurrent + '/' + selectRepo.name).then(function(response) {
            $scope.singleRepo = response.data;
           
        });

        $http.get('https://api.github.com/repos/' + usernameCurrent + '/' + selectRepo.name + '/commits').then(function(response) {
            $scope.commits = response.data;
    
        });

        $http.get('https://api.github.com/repos/' + usernameCurrent + '/' + selectRepo.name + '/git/trees/master?recursive=1').then(function(response) {

            var files = response.data.tree;
       

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
                   
                }
            }
           
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
    };
    $scope.sortType = 'id';
    $scope.sortReverse = false;
            
        });
     

});