/**
 * Created by sim_one_n_only on 5/8/17.
 */
var app = angular.module("appMeDown");

app.controller("profileController", ["$scope", "$uibModal", "$log", "$localStorage", "UserService", "itemService", function ($scope, $uibModal, $log, $localStorage, UserService, itemService) {
    $scope.currentUserItems = [];
    $scope.allItems = [];

    $scope.userService = UserService;
    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            UserService.changePassword(passwords.newPassword).then(function(response) {
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    }

    itemService.getItems().then(function (response) {

        $scope.currentUser = $localStorage.user;

        console.log($scope.currentUser._id);
        $scope.allItems = response;
        for(var i = 0; i < $scope.allItems.length; i++) {
            if($scope.allItems[i].user === $scope.currentUser._id) {
                $scope.currentUserItems.push($scope.allItems[i]);
            }
        }
        return $scope.currentUserItems;
    })

    $scope.delete = function (index, id) {
        itemService.removeItems(id).then(function () {
            $scope.currentUserItems.splice($scope.currentUserItems.indexOf(index, 1));
        })
    }

    $scope.edit = function (index, item) {
        itemService.editItems(item).then(function (response) {
            console.log(item);
            $scope.allItems = response;

        })


    }

}]);