/**
 * Created by sim_one_n_only on 5/8/17.
 */
var app = angular.module("appMeDown");

app.directive("postModal", [function () {
    return {
        restrict: "E",
        templateUrl: "components/modals/add-item-modal.html"
    };
}]);

app.controller("itemModalInstanceController", ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
    $scope.form = {};

    $scope.submitForm = function () {
        if($scope.form.itemForm.$valid) {
            console.log("user form is in scope");
            $uibModalInstance.close('closed');
        } else {
            console.log("user form is not in scope");
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('closed');
    };
}])