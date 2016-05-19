(function() {
    'use strict';

    angular.module('rpiTemp')
        .controller('ledCtrl', [
            'socket', '$scope',
            function(socket, $scope) {
                $scope.ledStatus = false;

                socket.on('led:status', function(data) {
                    $scope.ledStatus = !!data.value;
                    $scope.$apply();
                });

                $scope.onLedStatusChange = function(value) {
                    socket.emit(value ? 'led:on' : 'led:off');
                };

                socket.emit('led:status:get');

            }
        ]);

})();
