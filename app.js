var app = angular.module("app", ['ui.router','ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'loginController',
            data: {
                requireLogin: false
            }
           
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/views/register.html',
            controller: 'registerController',
            data: {
                requireLogin: false
            }
           
        })
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home.html',
            controller: 'homeController',
             data: {
                requireLogin: true
            }
        })
        
});

app.run(['$rootScope', '$state', '$localStorage', function($rootScope, $state, $localStorage) {
    $rootScope.$on('$stateChangeStart', function(event, $stateProvider) {

        var requireLogin = $stateProvider.data.requireLogin;
       
        if (requireLogin && typeof $localStorage.isLogin === "undefined" && !$localStorage.isLogin) {
            event.preventDefault();
            $state.go("login");
        }
    });

}]);

app.controller('appController', ['$scope','$state', '$localStorage', function($scope,$state,$localStorage) {
   
    $scope.luser = false;
    $scope.$on("sendLoginInfo", function(evt) {

        $scope.isLogin = (typeof $localStorage.isLogin !== "undefined" && $localStorage.isLogin == true) ? true : false;
        $scope.luser = (typeof $localStorage.isLogin !== "undefined" && $localStorage.isLogin == true) ? true : false;
});
 $scope.logoutUser = function() {
        delete $localStorage.isLogin;
        delete $localStorage.loginAdminUser;
        $scope.isLogin = false;
        $scope.luser = false;
        $state.go('login'); 
    }
}]);

