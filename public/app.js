var app = angular.module("appMeDown", ["ngRoute", "appMeDown.Auth"]);

app.controller("mainController", ("$scope", function ($scope) {
	
}]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
	$routeProvider
        .when("/home", {
            templateUrl: "components/home/home.html",
			controller: "homeController"
        })
        .when("/items", {
            templateUrl: "components/items/items.html",
            controller: "ItemController"
        })
		.otherwise({
		redirectTo:"/home"
	})
}])
