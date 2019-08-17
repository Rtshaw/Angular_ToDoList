var App = angular.module("App", []);

App.controller('todosControl', function ($scope) {
    $scope.master = undefined;
    $scope.todos = [];
    $scope.counter = $scope.todos.length;

    // new todos
    $scope.addTodo = function (newTodo) {
        var newInput = angular.copy(newTodo),
            newTodo = { id: $scope.counter+1, title: newInput, status: 0 };
        if(newTodo.title !== undefined){
            $scope.todos.push(newTodo);
            $scope.counter++;
            $scope.reset();
        }
    };

    // reset input field
    $scope.reset = function () {
        $scope.newTodo = angular.copy($scope.master);
    };

    $scope.edit = function(todo){
        var thisTodo = todo;
        thisTodo.edit = true;
        document.getElementById('edit-input-' + this.id).value = thisTodo.title;
    };

    $scope.save = function (todo, obj) {
        var thisTodo = todo,
            thisInputValue = document.getElementById('edit-input-' + thisTodo.id).value;

        if(thisInputValue !== ''){
            thisTodo.edit = false;
            thisTodo.title = thisInputValue;
        }
    };

    $scope.totalCount = function () {
        return $scope.todos.length;

    }


});