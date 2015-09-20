
(function(){

    var github = function($http) {

        var getUsers = function (apiFile) {
            return $http.get('../classes/' + apiFile).then(function (response) {

                return response.data;
            });
        };

        var searchUsers = function (url, userValue) {

            return $http({
                method: 'POST',
                url: url,
                data: userValue,
            })
        };

        return {
            users: getUsers,
            searchUsers: searchUsers
        }

    }

    var module = angular.module('MyPanel');
    module.factory('github', github);

}());