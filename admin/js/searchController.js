myPanel.controller('searchController',function($scope, github){

    $scope.showMost = true;
    $scope.showUnique = false;

    github.users('uniqueUsers.php').then(function(users){

        $scope.test = users;
    });

    github.users('../classes/mostSerahedUser.php').then(function(data){

        $scope.mostlySearched = data;
    });

    $scope.showSelectedUser = function(selectedUser){

        $scope.showMost = false;
        $scope.showUnique = true;

        var data = {
            name:selectedUser
        };

        github.searchUsers('../classes/singleUser.php', data).then(function(data){
            $scope.uniqueUser = data.data[0];
            $scope.dataArray = data.data[0].userdata;

            console.log($scope.uniqueUser);
        });
    };



});