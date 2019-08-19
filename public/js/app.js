(function (angular) {
    angular.module("App", ['ui.router'])
        // .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //     $routeProvider
        //         .when('/', {templateUrl:'index.html'})
        //         .when('/calendar', {templateUrl :'views/calendar.html'});
        //         // .otherwise({ redirectTo: '/index.html' })
        //     $locationProvider.html5Mode(true);
        //     // $locationProvider.hashPrefix('!');
        // }])
        .config(function ($stateProvider) {
            var todolistState = {
                name: 'todolist',
                url: '/todolist',
                templateUrl: 'views/todolist.html'
            };
            var dayState = {
                name: 'calendar',
                url: '/calendar',
                templateUrl: 'views/calendar.html'
            };
            $stateProvider.state(todolistState);
            $stateProvider.state(dayState);
        })
    .controller("todoController", function($scope){
        // $scope.data = {
        //     message : "Hello"
        // };

        $scope.today = new Date();
        $scope.saved = localStorage.getItem('todoItems');
        $scope.todoItem = (localStorage.getItem('todoItems') !== null)?
            // JSON.parse($scope.saved) : [{
            //     description: "",
            //     date: $scope.today.getFullYear() + " 年 " + $scope.today.getMonth() + " 月 " + $scope.today.getDate() + " 日",
            //     status: false,
            // }];
            JSON.parse($scope.saved) : [];
        localStorage.setItem('todoItems', JSON.stringify($scope.todoItem));


        // newTodo obj
        $scope.newTodo = {};
        $scope.newTodo.todoDate = $scope.today.getFullYear() + " 年 " + ($scope.today.getMonth()+1) + " 月 " + $scope.today.getDate() + " 日";
        $scope.newTodo.todoDescription = "";

        // add
        $scope.addTodo = function () {
            if($scope.newTodo.todoDescription === '' || $scope.newTodo.todoDate === ''){
                console.log('Nothing');
            }else{
                $scope.todoItem.push({
                    description: $scope.newTodo.todoDescription,
                    date: $scope.newTodo.todoDate,
                    status: false,
                });

                $scope.save();
                $scope.newTodo.todoDescription = "";
                $scope.newTodo.todoDate = $scope.today.getFullYear() + " 年 " + ($scope.today.getMonth()+1) + " 月 " + $scope.today.getDate() + " 日";
            }
        };

        // delete
        $scope.deleteTodo = function(index){
            $scope.todoItem.splice(index, 1);
            $scope.save();
        };

        $scope.save = function () {
            localStorage.setItem('todoItems', JSON.stringify($scope.todoItem));
        }
    });
})(window.angular);

// var App = angular.module("App", ['ngRoute']);
//
// App.controller("todoController", function($scope){
//     // $scope.data = {
//     //     message : "Hello"
//     // };
//
//     $scope.today = new Date();
//     $scope.saved = localStorage.getItem('todoItems');
//     $scope.todoItem = (localStorage.getItem('todoItems') !== null)?
//         // JSON.parse($scope.saved) : [{
//         //     description: "",
//         //     date: $scope.today.getFullYear() + " 年 " + $scope.today.getMonth() + " 月 " + $scope.today.getDate() + " 日",
//         //     status: false,
//         // }];
//         JSON.parse($scope.saved) : [];
//     localStorage.setItem('todoItems', JSON.stringify($scope.todoItem));
//
//
//     // newTodo obj
//     $scope.newTodo = {};
//     $scope.newTodo.todoDate = $scope.today.getFullYear() + " 年 " + ($scope.today.getMonth()+1) + " 月 " + $scope.today.getDate() + " 日";
//     $scope.newTodo.todoDescription = "";
//
//     // add
//     $scope.addTodo = function () {
//         if($scope.newTodo.todoDescription === '' || $scope.newTodo.todoDate === ''){
//             console.log('Nothing');
//         }else{
//             $scope.todoItem.push({
//                 description: $scope.newTodo.todoDescription,
//                 date: $scope.newTodo.todoDate,
//                 status: false,
//             });
//
//             $scope.save();
//             $scope.newTodo.todoDescription = "";
//             $scope.newTodo.todoDate = $scope.today.getFullYear() + " 年 " + ($scope.today.getMonth()+1) + " 月 " + $scope.today.getDate() + " 日";
//         }
//     };
//
//     // delete
//     $scope.deleteTodo = function(index){
//       $scope.todoItem.splice(index, 1);
//       $scope.save();
//     };
//
//     $scope.save = function () {
//         localStorage.setItem('todoItems', JSON.stringify($scope.todoItem));
//     }
// });
// App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//     $routeProvider
//         .when('/', {template:'index.html'})
//         .when('/calendar', {template:'calendar.html'});
//     $locationProvider.html5Mode(true);
// }]);