(function() {
    'use strict';

    var Gpio = require('onoff').Gpio,
        led = new Gpio(17, 'out');

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io')(server);

    function exit() {
        led.unexport();
        process.exit();
    }

    process.on('SIGINT', exit);

    app.use(express.static('public'));

    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });

    server.listen(3001, function() {
        console.log('Server is listening.');
    });

    io.on('connection', function(socket) {

        socket.on('led:on', function() {
            led.writeSync(1);
            io.sockets.emit('led:status', {
                value: 1
            });
        });

        socket.on('led:off', function() {
            led.writeSync(0);
            io.emit('led:status', {
                value: 0
            });
        });

        socket.on('led:status:get', function() {

            socket.emit('led:status', {
                value: led.readSync()
            });
        });
    });

})();
