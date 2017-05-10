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

app.controller("itemModalInstanceController", ["$scope", "$uibModalInstance", "itemService", function ($scope, $uibModalInstance, itemService) {
    $scope.form = {};

    $scope.submit = function (newItem) {
        $uibModalInstance.close(newItem);
    };
    // $scope.submit = function (newItem) {
    //     itemService.postItems(newItem).then(function () {
    //         $uibModalInstance.close(newItem);
    //         // $scope.items.push(newItem);
    //         // console.log($scope.items);
    //     })
    // };

    // $scope.submitForm = function () {
    //     if($scope.form.itemForm.$valid) {
    //         console.log("user form is in scope");
    //     } else {
    //         console.log("user form is not in scope");
    //     }
    // };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('closed');
    };
}]);
