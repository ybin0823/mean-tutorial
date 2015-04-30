var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log("Hello World from controller");


	$http.get('/contactList').success(function (res) {
		console.log("I got the data i requested");
		$scope.contactList = res;
		$scope.contact = "";
	});


	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).success(function (res) {
			console.log(res);
			window.location.reload(true);
		});
	};

	$scope.removeContact = function(id) {
		console.log(id);
		$http.delete('/contactList/' + id).success(function (res) {
			window.location.reload(true);
		});
	}
}]);