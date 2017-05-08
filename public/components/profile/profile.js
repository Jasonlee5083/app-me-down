/**
 * Created by sim_one_n_only on 5/8/17.
 */
var app = angular.module("appMeDown");

app.controller("profileController", ["$scope", "$uibModal", "$log", "UserService", function ($scope, $uibModal, $log, UserService) {
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

    $scope.showForm = function () {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        var modalInstance = $uibModal.open({
            templateUrl: "add-item-modal.html",
            controller: "itemModalInstanceController",
            scope:$scope,
            resolve: {
                itemForm: function () {
                    return $scope.itemForm;
                }
            }
        });

        modalInstance.result.then(function (newItem) {
            $scope.selected = newItem;
        }, function () {
            $log.info("Modal dismissed at: " + new Date());
        });
    };

}]);