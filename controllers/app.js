/**
 * This imports the angular modules and the first parameter
 * in the module is linked to the ng-controller
 * directive
 **/

const app = angular.module('Invertedindex', [])

app.controller('inverted', ($scope) => {

  $scope.test = 'Nelson Rotimi' //$scope makes the variable global

});