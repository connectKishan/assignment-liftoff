var app = angular.module('myApp',[]);

app.controller('formCtrl',function($scope,$http) { 
  $scope.formList={
    "first_name":"",
    "middle_name":"",
    "last_name":"",
    "comp_name":"",
    "email":"",
};
$scope.id=0;         
$scope.submitForm = function(isValid) {
      // check to make sure the form is completely valid
    if (isValid) {
      console.log($scope.formList);
      $http.post('/formData').then(function(response){
        alert(response)
      });
    }
  };
  $scope.reset=function(){
    $scope.formList={
      "first_name":"",
      "middle_name":"",
      "last_name":"",
      "comp_name":"",
      "email":"",
  };
  }
});

app.controller('listCtrl',function($scope,$http){
  $http.get('/fileList.json').then(function(response){
    $scope.listData=response.data;
  });
})
app.service('myService',function(){
  });

