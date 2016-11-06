var api_root = "http://localhost:3000";
angular.module('angularTracker', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get(api_root + '/topics')
        .success(function(data) {
            console.log(data);
            $scope.topics = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createTopic = function(){
        $http.post('/topics', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.topics = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.deleteTopic = function(id) {
        $http.delete('/topics/' + id)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}
