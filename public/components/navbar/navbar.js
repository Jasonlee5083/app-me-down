var app = angular.module("appMeDown");
app.directive("navbar", ["UserService", function(UserService) {
	return{
		templateUrl: "components/navbar/navbar.html",
		controller: "navbarController",
		link: function(scope) {
			scope.userService = UserService;
		}
	};
}]);

app.controller("navbarController",["$scope", "$uibModal", "$log", function ($scope, $uibModal, $log) {
	$scope.showForm = function () {
		$scope.message = "Show Form Clicked";
		console.log($scope.message);
		var modalInstance = $uibModal.open({
			templateUrl: "add-item-modal.html",
			controller: "itemModalInstanceController",
			scope: $scope,
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
}] )