 angular
    .module('angularTracker', ['ngRoute'])
     .config(['$routeProvider', function ($routeProvider) {

         $routeProvider.when('/', {
                 controller: 'topicsController',
                 templateUrl: '/index.html'
             })
             .otherwise({ redirectTo: '/' });

     }])
    .service('dataService', ['$http', function ($http) {

        var urlBase = 'http://localhost:3000/topics';

        this.getTopics = function () {
            return $http.get(urlBase);
        };

        this.getTopic = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.insertTopic = function (topic) {
            return $http.post(urlBase, topic);
        };

        this.updateTopic = function (topic) {
            return $http.put(urlBase + '/' + topic.ID, topic)
        };

        this.deleteTopic = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

    }])
    .controller('topicController',
        function ( $scope, dataService) {

            $scope.topics;
            getTopics();

            function getTopics() {
                dataService.getTopics()
                    .then(function (response) {
                        $scope.topics = response.data;

                    }, function (error) {
                        $scope.status = 'Unable to load Topic data: ' + error.message;
                    });
            };

            $scope.updateTopic = function (id) {
                dataService.updateTopic(id)
                    .then(function (response) {
                        $scope.status = 'Updated Topic! Refreshing Topic list.';
                    }, function (error) {
                        $scope.status = 'Unable to update Topic: ' + error.message;
                    });
            };

            $scope.insertTopic = function () {
                dataService.CreateTopic()
                    .then(function (response) {
                        $scope.status = 'Inserted Topic! Refreshing Topic list.';
                        $scope.topics.push(topic);
                    }, function(error) {
                        $scope.status = 'Unable to insert Topic: ' + error.message;
                    });
            };

            $scope.deleteTopic = function (id) {
                dataService.deleteTopic(id)
                    .then(function (response) {
                        $scope.status = 'Deleted Topic! Refreshing Topic list.';
                    }, function (error) {
                        $scope.status = 'Unable to delete Topic: ' + error.message;
                    });
            };

        }
    );
