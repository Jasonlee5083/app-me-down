var app = angular.module("appMeDown", [
    "ngRoute",
    "appMeDown.Auth",
    "ngAnimate",
    "ngSanitize",
    "ui.bootstrap",
    "uiGmapgoogle-maps",
    "thatisuday.dropzone",
    "ngFileUpload",
    "ngMaterial",
    "ngAria"
]);

Dropzone.autoDiscover = false;

app.controller("mainController", ["$scope", function ($scope) {

}]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/items", {
            templateUrl: "components/items/items.html",
            controller: "itemController"
        })
        .otherwise({
            redirectTo: "/items"
        })
}]);

app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {

    GoogleMapApiProviders.configure({
        china: true,
        key: "AIzaSyAFrB1ToTkq4a-BNsaGUf_zgtR_Rb3Aa-0&"
    });
}]);