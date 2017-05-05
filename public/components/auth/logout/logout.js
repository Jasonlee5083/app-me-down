var app = angular.module("appMeDown.Auth");

app.controller("LogoutController", ["UserService", function (UserService) {  
    UserService.logout();
}]);
