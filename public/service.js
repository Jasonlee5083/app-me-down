var app = angular.module("appMeDown");

app.service("itemService", ["$http", function ($http) {
    this.getItems = function () {
        return $http.get("/api/items").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.postItems = function(newitem) {
        return $http.post("/api/items",newitem).then(function(response){
            return response.data;
        })

    }

    this.removeItems = function(id) {
        return $http.delete("/api/items" + id).then(function(response){
            return "you item has been deleted"
        })
    }

    this.saveItems = function (todo) {
        return $http.post("/api/items", newitem).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
}]);/**
 * Created by sim_one_n_only on 5/8/17.
 */
