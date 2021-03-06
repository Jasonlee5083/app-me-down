var app = angular.module("appMeDown");

app.service("itemService", ["$http", "Upload", "mapService", "userService", function ($http, Upload, mapService, userService) {
    this.getItems = function () {
        return $http.get("/api/items").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.postItems = function (data) {
        // return userService.getUser(user);
        return mapService.getMapinfo(data.newItem.place.name)
            .then(function (mapData) {
                data.newItem.place.lat = mapData.results[0].geometry.location.lat;
                data.newItem.place.lng = mapData.results[0].geometry.location.lng;
                return Upload.upload({
                    url: "/api/items",
                    data: {file: data.images, data: data.newItem}
                });
            })
            .then(function (response) {
                return response.data;
            });
    };

    this.removeItems = function (id) {
        return $http.delete("/api/items/" + id).then(function (response) {
            return "your item has been deleted"
        });
    };

    this.editItems = function (item) {
        return $http.put("/api/items/" + item._id, item).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.mapService = function (item) {
        return response.data;
    };

    this.getUsersItems = function () {
        return $http.get("/api/users/my/items").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.getFavorites = function () {
        return $http.get("/api/users/my/favorites").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.postFavorite = function (item) {
        return $http.post("/api/items/" + item._id + "/favorites/").then(function (response) {
            return response.data;
        })
    };

    this.removeFavorite = function (item) {
        return $http.put("/api/items/" + item + "/favorites/").then(function (response) {
            return response.data;
        });
    };
}]);

// Google Map API

app.service("mapService", function ($http) {

    var config = {
        headers: {
            'X-Mashape-Key': 'dfnU4hYGHxmshVKRvFYPvQND3Cfdp1sXuUpjsnhzljyW6zmpc0'
        }
    };

    this.getMapinfo = function (placeName) {
        var url = 'https://michele-zonca-google-geocoding.p.mashape.com/geocode/json?address=' + placeName;
        return $http.get(url, config).then(function (response) {
            return response.data;
        });
    }

});

app.service("userService", function ($http) {

    this.getUser = function (user) {

        return $http.get("/api/items").then(function (response) {
            console.log(response.data);
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        })
    }
});


/**


 * Created by sim_one_n_only on 5/8/17.
 */
