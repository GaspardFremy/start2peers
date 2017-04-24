/* Script for Socket (client) */

var socket = io('http://localhost:1337');
var increment = 0;

// WHEN USER CONNECT
socket.on('connect', function() {
    console.log('Nouveau socket !!!');
    console.log(socket.id);
});

// WHEN USER LEFT, DISPLAY IT
socket.on('has_left', function(data) {
    var li = document.createElement('li');
    li.innerHTML = " <li class='message_box'><div class='user_name'>" + data + " leave the chat </div></li>";
    document.getElementsByTagName('ul')[1].appendChild(li)
    $("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
});

// WHEN RESPONSE IS RECIEVED BY CLIENT
socket.on('response', function(data) {
    console.log('client: Response recieved:');
    console.log(data);
});

// WHEN NEW MESSAGE IS SEND, DISPLAY IT
socket.on('newmessage', function(newmessage) {
    console.log('newmessage', newmessage);
    // Get the date
    var date = new Date();
    seconds = date.getSeconds(),
        minutes = date.getMinutes(),
        hour = date.getHours(),
        day = date.getDate(),
        monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ],
        monthIndex = date.getMonth()
    // Make dynamic message template
    var li = document.createElement('li');
    li.innerHTML = " <li class='message_box'><div class='user_name'>" + newmessage.username + " </div><div class='date_style'> " + day + " " + monthNames[monthIndex] + " " + hour + ':' + minutes + ':' + seconds + "</div><p class='message_style'>" + newmessage.msg + "</p></li>";
    document.getElementsByTagName('ul')[1].appendChild(li)
    //auto scroll down
    $("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
});

var sendmessage = function() {
    var input = document.getElementsByTagName('input')[1];
    console.log(input.value)
    socket.emit('message', input.value)
    input.value = '';
};

// DISPLAY WHEN USER CONNECT
socket.on('truc_joined_chat', function(data) {
    console.log(data + 'connected');
    var li = document.createElement('li');
    li.innerHTML = " <li class='message_box'><div class='user_name'>" + data + " joined the chat </div></li>";
    document.getElementsByTagName('ul')[1].appendChild(li)
    $("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
});

// DISPLAY WHEN USER LEAVE
socket.on('disconnect', function(data) {
    console.log(data + 'leave');
    var li = document.createElement('li');
    li.innerHTML = " <li class='message_box'><div class='user_name'>" + data + " leave the chat </div></li>";
    document.getElementsByTagName('ul')[1].appendChild(li)
    $("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
});

//SEND IMAGE
socket.on('user_image', function(newimage) {
    var date = new Date();
    seconds = date.getSeconds(),
        minutes = date.getMinutes(),
        hour = date.getHours(),
        day = date.getDate(),
        monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ],
        monthIndex = date.getMonth();
    var li = document.createElement('li');
    li.innerHTML = " <li class='message_box'><div class='user_name'>" + newimage.username + " </div><div class='date_style'> " + day + " " + monthNames[monthIndex] + " " + hour + ':' + minutes + ':' + seconds + "</div><img class='message_style' src=' " + newimage.image + " ' style='max-width: 538px;' /></li>";
    document.getElementsByTagName('ul')[1].appendChild(li);
    $("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
});


// GET AND STORE USERNAME IN FILE
function readAndSendFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function(e) {
            socket.emit('send_image', e.target.result);
        });
        FR.readAsDataURL(this.files[0]);
    }
};

document.getElementById("imagefile").addEventListener("change", readAndSendFile);

// GET USERNAME
var send_user_name = function() {
    var user_name = document.getElementsByTagName("input")[0].value;
    socket.emit('coucou', user_name)
    user_name.value = '';
};

// SEND INPUT WITH ENTER KEY
document.getElementsByTagName('button')[1].addEventListener('click', sendmessage);
document.getElementsByTagName('button')[0].addEventListener('click', send_user_name);
document.getElementsByTagName('input')[0].addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
        $('#start_chatting').click();
    }
});

document.getElementsByTagName('input')[1].addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
        sendmessage();
    }
});
