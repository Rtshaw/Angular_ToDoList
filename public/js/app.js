(function (angular) {
    angular.module("App", ['720kb.datepicker', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/todolist');
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

            $scope.today = new Date();

            $scope.mm = ($scope.today.getMonth()+1)<10? '0'+($scope.today.getMonth()+1):$scope.today.getMonth()+1;
            $scope.dd = ($scope.today.getDate())<10? '0'+($scope.today.getDate()) : $scope.today.getDate();

            $scope.todayFormat = $scope.today.getFullYear() + " 年 " + $scope.mm + " 月 " + $scope.dd + " 日";
            $scope.saved = localStorage.getItem('todoItems');
            $scope.todoItem = (localStorage.getItem('todoItems') !== null)?
                JSON.parse($scope.saved) : [];
            localStorage.setItem('todoItems', JSON.stringify($scope.todoItem));


            // newTodo obj
            $scope.newTodo = {};
            $scope.newTodo.todoDate = $scope.today.getFullYear() + " 年 " + $scope.mm + " 月 " + $scope.dd + " 日";
            $scope.newTodo.todoDescription = "";

            // add
            $scope.addTodo = function () {
                if($scope.newTodo.todoDescription === '' || $scope.newTodo.todoDate === ''){
                    console.log('Nothing');
                }else{
                    $scope.todoItem.push({
                        date: $scope.newTodo.todoDate,
                        description: $scope.newTodo.todoDescription,
                        status: false,
                    });


                    $scope.save();
                    $scope.newTodo.todoDescription = "";
                    $scope.newTodo.todoDate = $scope.today.getFullYear() + " 年 " + $scope.mm + " 月 " + $scope.dd + " 日";
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
        })
        .controller("dateController", function ($scope) {
            $scope.today = new Date();

            $scope.mm = ($scope.today.getMonth()+1)<10? '0'+($scope.today.getMonth()+1):$scope.today.getMonth()+1;
            $scope.dd = ($scope.today.getDate())<10? '0'+($scope.today.getDate()) : $scope.today.getDate();

            $scope.todayFormat = $scope.today.getFullYear() + " 年 " + $scope.mm + " 月 " + $scope.dd + " 日";
            $scope.saved = localStorage.getItem('todoItems');
            $scope.dayList = (localStorage.getItem('todoItems')!==null)?
                JSON.parse($scope.saved):[];
            console.log($scope.dayList);

            // date obj
            $scope.chooseDay = {};
            $scope.chooseDay.Date = "";

            $scope.chosen = function () {
                if($scope.chooseDay.Date == ''){
                    console.log('Empty');
                }else{
                    console.log($scope.chooseDay.Date);
                }
            }

        });
})(window.angular);
