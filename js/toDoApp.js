/// <reference path="../Scripts/angular.js" />

var model = {
    user: 'Adam',
   // items: [{ action: "Buy Flowers", done: false }, { action: "Get Shoes", done: false }, { action: "Collect Tickets", done: true }, { action: "Call Joe", done: false }]

};

var app = angular.module('toDoApp', []);

app.run(function ($http) {
    $http.get("todo.json").success(function (data) {
        model.items = data;
    });
});

app.filter('checkedItems', function () {
    return function (items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function (item) {
            if (item.done == false || showComplete == true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});

app.controller('ToDoCtrl', ['$scope', function ($scope) {

    $scope.title = 'Welcome to Angular app';
    $scope.todo = model;

    $scope.incompleteCount = function() {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {

            if (!item.done) {
                count++;
            }
            
        });

        return count;
    }

    $scope.warningLevel = function() {

        return ($scope.incompleteCount() < 3) ? "label-success" : "label-warning";
    }

    $scope.addNewItem = function (actionText) {

        $scope.todo.items.push({ action: actionText, done: false });
        $scope.actionText = '';

    }

}]);