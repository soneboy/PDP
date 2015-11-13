myPanel.controller('UploadCtrl', ['$scope','$http','github','$log', function ($scope, $http,github,$log) {
   
$scope.functionForUploadingImage = function(files){
   $scope.imageFileForUpload = files[0];
   $log.info($scope.imageFileForUpload);
  };
  
 
  }]);


