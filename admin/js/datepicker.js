   myPanel.controller('DatepickerDemoCtrl', function($scope) {

       $scope.open = function($event) {
           $scope.status.opened = true;
       };

       $scope.dateOptions = {
           formatYear: 'yy',
           startingDay: 1
       };

       $scope.formats = ['yyyy-MM-dd'];
       $scope.format = $scope.formats[0];

       $scope.status = {
           opened: false
       };


});