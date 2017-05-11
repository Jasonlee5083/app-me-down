var app = angular.module("appMeDown", ["ngRoute", "appMeDown.Auth", "ngAnimate", "ngSanitize", "ui.bootstrap","uiGmapgoogle-maps"]);

app.controller("mainController", ["$scope", function ($scope) {

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
			controller: "itemController"
		})
		.otherwise({
			redirectTo: "/home"
		})
}])

app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {

	GoogleMapApiProviders.configure({
		china: true
	});
    }]);