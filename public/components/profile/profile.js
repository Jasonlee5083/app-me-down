/**
 * Created by sim_one_n_only on 5/8/17.
 */
var app = angular.module("appMeDown");

app.controller("profileController", ["$scope", "$uibModal", "$log", "$localStorage", "AuthService", "itemService", function ($scope, $uibModal, $log, $localStorage, AuthService, itemService) {
    $scope.items = [];
    $scope.user = [];
    $scope.favorites = [];
	$scope.favoritesby = [];


    $scope.userService = AuthService;
    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            AuthService.changePassword(passwords.newPassword).then(function(response) {
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    };

    itemService.getUsersItems().then(function (items) {
        console.log(items)
        $scope.items = items;
    });

    itemService.getFavorites().then(function (favorites) {
        $scope.favorites = favorites;
    });



    $scope.delete = function (index, id) {
		console.log(id);
        itemService.removeItems(id).then(function () {
	   $scope.items.splice(index, 1);

        })
    };

    $scope.edit = function (index, item) {
        itemService.editItems(item).then(function (response) {
            $scope.allItems = response;

        })
    };


	$scope.deleteFavorite = function (index, item) {
      itemService.removeFavorite(item).then(function (response) {
           $scope.favorites.splice(index, 1);
      })
   }




}]);