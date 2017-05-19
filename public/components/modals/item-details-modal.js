/**
 * Created by sim_one_n_only on 5/15/17.
 */
var app = angular.module("appMeDown");

app.directive("itemDetailModal", [function () {
    return {
        restrict: "E",
        templateUrl: "components/modals/item-details-modal.html"
    };
}]);

app.controller("modalDetailInstanceController", ["$scope", "$timeout", "$uibModalInstance", "itemService", "mapService", "item", function ($scope, $timeout, $uibModalInstance, itemService, mapService, item) {

    $scope.item = item;
    $scope.render = true;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('closed');
    };



}]);