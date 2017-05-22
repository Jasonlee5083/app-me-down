var app = angular.module("appMeDown.Auth");

app.controller("LogoutController", ["AuthService", function (AuthService) {
    AuthService.logout();
}]);
