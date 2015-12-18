myPanel.controller('panelCotroller', function($scope, $http, github) {
    
$scope.showAll = function(){
    
    github.searchUsers('../classes/showGithubUsers.php', {showAll : true}).then(function(response){
        
        $scope.gitUsers = response.data;
            });
            
            $scope.hideheading = false;
        
        };      
    
$http.get('../classes/showGithubUsers.php').then(function(response){

    $scope.gitUsers = response.data;

 });
           $scope.hideheading = true;


$("body").mouseover(function(){
    
    $( "#dateImput" ).attr("disabled", false);
    
});

$( "#dateImput" ).mouseover(function( event ) {
  event.stopPropagation();
  $(this).attr("disabled",true);
});

$("buttonbtn.btn-sm.btn-danger.ng-binding").click(function(){
    
    alert('mrnjaoo');
});
//console.log(getButtons);

$scope.addFilter = function(searchText){

    var getDate = new Date(searchText);
    $scope.filterResult = getDate.format('yyyy-mm-dd');
    console.log($scope.filterResult);

};

});


