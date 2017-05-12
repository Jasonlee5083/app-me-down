var app = angular.module("appMeDown");


app.service("itemService", ["$http", "Upload", "mapService", function ($http, Upload, mapService) {
	this.getItems = function () {
		return $http.get("/api/items").then(function (response) {
			return response.data;
		}, function (response) {
			alert("Error " + response.status + ": " + response.statusText);
		});
	};

	this.postItems = function (newItem) {
		return mapService.getMapinfo(newItem.place.name)
			.then(function (mapData) {
				newItem.place.lat = mapData.results[0].geometry.location.lat;
				newItem.place.lng = mapData.results[0].geometry.location.lng;








				return $http.post("/api/items/", newItem);
			})
			.then(function (response) {
				return response.data;
			});
	};

	this.removeItems = function (id) {
		return $http.delete("/api/items/" + id).then(function (response) {
			return "you item has been deleted"
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

	}
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

})




/**


 * Created by sim_one_n_only on 5/8/17.
 */
