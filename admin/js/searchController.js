myPanel.controller('searchController',function($scope, github){

    github.users('uniqueUsers.php').then(function(users){

        $scope.test = users;
    });

    $scope.showSelectedUser = function(selectedUser){

        var data = {
            name:selectedUser
        };

        github.searchUsers('../classes/uniqueUsers.php', data);


    };



});