var app = angular.module("appMeDown");

app.directive("postModal", [function () {
	return {
		restrict: "E",
		templateUrl: "components/modals/add-item-modal.html"
	};
}]);

app.controller("itemModalInstanceController", ["$scope", "$timeout", "$uibModalInstance", "itemService", "mapService", function ($scope, $timeout, $uibModalInstance, itemService, mapService) {


	$scope.submit = function (newItem) {
		$uibModalInstance.close({newItem: newItem, images: $scope.dzMethods.getAllFiles()});
	};
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('closed');
	};
// app.controller('uploadController', function($scope){
	$scope.dzOptions = {
		url : "/api/items",
		paramName: "photo",
		maxFilesize: "10",
		addRemoveLinks : true,
        dictDefaultMessage : 'Click to add or drop photos',
        dictRemoveFile : 'Remove photo',
        dictResponseError : 'Could not upload this photo',
        init: function() {
            this.on('error', function(file, errorMessage) {
                if (file.accepted) {
                    var mypreview = document.getElementsByClassName('dz-error');
                    mypreview = mypreview[mypreview.length - 1];
                    mypreview.classList.toggle('dz-error');
                    mypreview.classList.toggle('dz-success');
                }
            });
        }
	};

	$scope.dzMethods = {};

	$scope.dzCallbacks = {
        'addedfile' : function(file){
            $scope.showBtns = true;
            $scope.lastFile = file;
        },
        'error' : function(file, xhr){
            console.warn('File failed to upload from dropzone 2.', file, xhr);
        }
	}
}]);





