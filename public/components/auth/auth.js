var app = angular.module("appMeDown.Auth", ["ngStorage"]);

app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/signup", {
            templateUrl: "components/auth/signup/signup.html",
            controller: "SignupController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController"
        })
        .when("/logout", {
            template: "",
            controller: "LogoutController"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "profileController"
        })
}]);

app.service("TokenService", ["$localStorage", function ($localStorage) {


    this.setToken = function (token) {
        $localStorage.token = token;
    };

    this.getToken = function () {
        return $localStorage.token;
    };

    this.removeToken = function () {
        delete $localStorage.token;
    };
}]);

app.service("UserService", ["$http", "$location", "TokenService", "$localStorage", function ($http, $location, TokenService, $localStorage) {
	var self = this;
    this.currentUser = $localStorage.user || {};

    this.signup = function (user) {
        return $http.post("/auth/signup", user);
    };

    this.login = function (user) {
        return $http.post("/auth/login", user).then(function (response) {
            TokenService.setToken(response.data.token);
            $localStorage.user = response.data.user;
			self.currentUser = response.data.user;
            return response;
        });
    };

    this.logout = function () {
        TokenService.removeToken();
        $location.path("/login");
    };

    this.changePassword = function (newPassword) {
        return $http.post("/auth/change-password", {newPassword: newPassword}).then(function (response) {
            alert("Password changed successfully!");
            return response.data;
        }, function (response) {
            alert("Problem with the server.");
        });
    };

    this.isAuthenticated = function () {
        return !!TokenService.getToken();
    };
}]);

app.service("AuthInterceptor", ["$q", "$location", "TokenService", function ($q, $location, TokenService) {
    this.request = function (config) {
        var token = TokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };

    this.responseError = function (response) {
        if (response.status === 401) {
            TokenService.removeToken();
            $location.path("/login");
        }
        return $q.reject(response);
    };
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);
