var app = angular.module("appMeDown");
app.directive("navbar", ["AuthService", function (AuthService) {
    return {
        templateUrl: "components/navbar/navbar.html",
        controller: "navbarController",
        link: function (scope) {
            scope.userService = AuthService;
        }
    };
}]);

app.controller("navbarController", ["$scope", "$uibModal", "$log", function ($scope, $uibModal, $log) {

}]);