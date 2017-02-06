/**
 * This imports the angular modules and the first parameter
 * in the module is linked to the ng-controller
 * directive
 **/

const app = angular.module('InvertedIndex', []);

app.controller('inverted', ($scope) => {
  // $scope makes the variable global
  $scope.test = 'Am global!'

});

app.controller ('validateController', ($scope) => {
    $scope.validateFile = function () {
      console.log("it works");
    }
});
