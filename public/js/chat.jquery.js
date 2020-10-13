//Referencia divUsers
let divUsers = $('#divUsers');
let formSend = $('#form-send');
let txtMessage = $('#txt-message');
let divChatbox = $('#divChatbox');


//Funciones para renderizar usuarios
function rederUsers(persons) {


    console.log(persons);

    let html = '';

    html += '<li>';
    html += '     <a href="javascript:void(0)" class="active"> Chat de <span>' + persons[0].room + '</span></a>';
    html += '</li>'

    for (let i = 0; i < persons.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsers.html(html)

}

function renderMessage(message, i) {
    let html = '';

    let date = new Date(message.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    if (i) {
        html += '<li class="reverse">'
        html += '<div class="chat-content">'
        html += '    <h5>' + message.name + '</h5>'
        html += '    <div class="box bg-light-inverse">' + message.message + '</div>'
        html += '</div>'
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '<div class="chat-time">' + hour + ' am</div>'
        html += '</li>'
    } else {
        html += '<li class="animated fadeIn">';
        html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += '    <h5>' + message.name + '</h5>';
        html += '    <div class="box bg-light-info">' + message.message + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
    scrollBottom();
}

// Listeners

divUsers.on('click', 'a', function() {
    let id = $(this).data('id')

    if (id) {
        console.log(id);
    }

});

formSend.on('submit', function(e) {

    e.preventDefault();


    if (txtMessage.val().trim().length === 0) {
        return
    }

    socket.emit('createMessage', { message: txtMessage.val() }, function(message) {
        txtMessage.val('').focus();
        renderMessage(message, true);
        scrollBottom();
    });
});

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }

}