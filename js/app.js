var myApp = angular.module('MyApp', ['ngRoute','ngSanitize', 'ui.bootstrap']);

myApp.config(function($routeProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'search.html',
            controller: 'searhController'
        })
        
            .when('/user',{
             
            templateUrl: 'main.html',
            controller: 'mainController'
                
        })


        .otherwise({redirectTo:'/'});
});


