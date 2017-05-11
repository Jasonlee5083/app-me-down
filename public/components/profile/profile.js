/**
 * Created by sim_one_n_only on 5/8/17.
 */
var app = angular.module("appMeDown");

app.controller("profileController", ["$scope", "$uibModal", "$log", "$localStorage", "UserService", "itemService", function ($scope, $uibModal, $log, $localStorage, UserService, itemService) {
    $scope.items = [];
    $scope.favorites = [];


    $scope.userService = UserService;
    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            UserService.changePassword(passwords.newPassword).then(function(response) {
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    };

    itemService.getUsersItems().then(function (items) {
        $scope.items = items;
    });

    $scope.delete = function (index, id) {
        itemService.removeItems(id).then(function () {
            $scope.items.splice($scope.items.indexOf(index), 1);
        })
    };

    $scope.edit = function (index, item) {
        itemService.editItems(item).then(function (response) {
            console.log(item);
            $scope.allItems = response;

        })
    };

    itemService.getFavorites().then(function (item) {
        $scope.favorites = item;
    })





}]);