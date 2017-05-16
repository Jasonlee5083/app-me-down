/**
 * Created by sim_one_n_only on 5/8/17.
 */
var app = angular.module("appMeDown");

app.controller("profileController", ["$scope", "$uibModal", "$log", "$localStorage", "UserService", "itemService", function ($scope, $uibModal, $log, $localStorage, UserService, itemService) {
    $scope.items = [];
    $scope.favorites = [];
	$scope.favoritesby = [];


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

    itemService.getFavorites().then(function (items) {
        $scope.favorites = items;
    });

    $scope.deleteFavorite = function (index, item) {
       itemService.removeFavorite(item).then(function (response) {
           response.favoritedBy.splice(index, 1);
           console.log(response.favoritedBy);
           $scope.favorites.splice(index, 1);
       })
    }

    $scope.delete = function (index, id) {
		console.log(id);
        itemService.removeItems(id).then(function () {
//         $scope.items.splice($scope.items.indexOf(index), 1);
	   $scope.items.splice(index, 1);

        })
    };

    $scope.edit = function (index, item) {
        itemService.editItems(item).then(function (response) {
            $scope.allItems = response;

        })
    };

    // itemService.getFavorites().then(function (items) {
    //     $scope.favorites.push(items);
    // })
	$scope.deleteFavorite = function (index, item) {
      itemService.removeFavorite(item).then(function (response) {
		  $scope.favoritesby=response.favoritedBy;
		  
          console.log($scope.favoritesby);
           $scope.favorites.splice(index, 1);
		  $scope.favoritesby.splice(index, 1);
		  console.log($scope.favoritesby);

      })
   }




}]);