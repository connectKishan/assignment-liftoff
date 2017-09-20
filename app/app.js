var app = angular.module('myApp',[]);

app.controller('formCtrl',function($scope,$http) { 
  $scope.formList={
    "first_name":"",
    "middle_name":"",
    "last_name":"",
    "comp_name":"",
    "email":"",
};
         
$scope.submitForm = function(isValid) {
      // check to make sure the form is completely valid
    if (isValid) {
      var data=$scope.formList;
      var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    $http.post('/formData', data, config)
    .then(function (response, status, headers, config) {
        $scope.PostDataResponse = response.data;
        console.log($scope.PostDataResponse)
    })
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
  $scope.data={"email":""};
  $scope.delete=function(){
    var data=$scope.data;
    var config = {
      headers : {
          'Content-Type': 'application/json'
      }}
$http.get('/delete',data,config)
.then(function(response,status,headers,config){

})
  };
});
app.controller('listCtrl',function($scope,$http){
  $http.get('/formList').then(function(response){
    $scope.listData=response.data;
    
  });
})
app.service('myService',function(){
  });

