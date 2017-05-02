//SET UP MODULE AND SERVER

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jquery = require('jquery');
var fs = require('fs');

io.on('connection', function(socket) {
    //new connection
    console.log('a user is connected');
    console.log(socket.id);

// TRIGGER WHEN USER DISCONNET
    socket.on('disconnect', function(data) {
        console.log('user disconnected');
        socket.emit("has_left", data);
    });

// TRIGGER WHEN USER CONNECT
    socket.on('connect', function() {
        console.log('user connected');
    });

// TRIGGER WHEN USER LEAVE
    socket.on('leave', function(e) {
        io.emit('has_left')
    });

// TRIGGER WHEN USER REGISTER
    socket.on('coucou', function(data) {
        io.emit('truc_joined_chat', data);
        console.log(data);
        console.log(socket.id + " " + "est le socket de" + data)
        console.log(socket.id)

        var user_disconnected = data;

        socket.on('disconnect', function() {
            console.log('user disconnected');
            io.emit("has_left", user_disconnected);
        });

        // MKDIR USER FILE
        fs.mkdir(__dirname + '/profiles/' + data, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('userdir of' + data + ' is created')
        });

        // TOUCH USER NAME IN FILE
        fs.writeFile(__dirname + "/profiles/" + data + "/username.txt", data, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file of" + data + " was saved!");
        });

        var path_of_the_user = __dirname + "/profiles/" + data;

		//SOCKET ON MESSAGE
        socket.on('message', function(message) {
            console.log('recieved', message);
            var message_object = {
                username: data,
                msg: message
            };
            io.emit('newmessage', message_object);
        })
		//SOCKET ON IMAGE
        socket.on('send_image', function(img) {
            var image_object = {
                username: data,
                image: img
            };
            console.log(img);
            io.emit('user_image', image_object);
        });
    });
});

//Rename path for more security from public to static
app.use('/static/css', express.static(__dirname + '/public/css'));
app.use('/static/js', express.static(__dirname + '/public/js'));
app.use('/static/image', express.static(__dirname + '/public/image'));
app.use('/static/fonts', express.static(__dirname + '/public/fonts'));

app.get('/chat', function(req, res) {
    console.log('REQ on /chat');
    res.sendFile(__dirname + '/views/start2peers.html');
});

app.get('/test', function(req, res) {
    console.log('REQ on /test');
    res.sendFile(__dirname + '/views/test.html');
});

server.listen(8080);
