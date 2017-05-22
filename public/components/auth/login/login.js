var app = angular.module("appMeDown.Auth");

app.controller("LoginController", ["$scope", "$location", "AuthService", function ($scope, $location, AuthService) {

    $scope.login = function (user) {
        AuthService.login(user).then(function (response) {
            $location.path("/home");
        }, function (response) {
            alert(response.data.message);
        });
    }
}]);