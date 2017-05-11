var app = angular.module("appMeDown");
app.directive("navbar", ["UserService", function (UserService) {
    return {
        templateUrl: "components/navbar/navbar.html",
        controller: "navbarController",
        link: function (scope) {
            scope.userService = UserService;
        }
    };
}]);

app.controller("navbarController", ["$scope", "$uibModal", "$log", function ($scope, $uibModal, $log) {

}]);