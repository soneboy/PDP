myPanel.controller('searchController',function($scope, github){

    github.users('uniqueUsers.php').then(function(users){

        $scope.test = users;
    });

    $scope.showSelectedUser = function(selectedUser){

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