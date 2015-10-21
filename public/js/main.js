angular.module('app', ['ngRoute'])
      // Service
      .factory('Posts', ['$http', function($http){
        return $http.get('/api/postsordered');
      }])

      // Controller
      .controller('PostController', ['$scope', 'Posts', function ($scope, Posts) {
        Posts.success(function(data){
          $scope.posts = data;
        }).error(function(data, status){
          console.log(data, status);
          $scope.posts = [];
        });
      }])
      
      // .controller('PostDetailCtrl', ['$scope', '$routeParams', 'Posts', function ($scope, $routeParams, Posts) {
      //   $scope.post = Posts[$routeParams.id];
      // }])
      
      .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
          .when('/', {templateUrl: '/homefeed.html'})
          .when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'})
          .when('/logout', {controller: 'logoutController'})
          .when('/register', {templateUrl: 'partials/register.html', controller: 'registerController'})
          .when('/one', {template: '<h1>This is page one!</h1>'})
          .when('/two', {template: '<h1>This is page two!</h1>'})
          .otherwise({redirectTo: '/'});
      }]);
