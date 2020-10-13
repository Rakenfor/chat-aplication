let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El  nombre y sala son nocesarios');
}

let user = {
    name: params.get('name'),
    room: params.get('room')
}

//Escuchar 
socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(resp) {
        // console.log('Todos los conectados: ', resp);
        rederUsers(resp);
    });

});

//escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Enviando message


//Escuchar message
socket.on('createMessage', function(message) {
    // console.log(message);

    renderMessage(message, false);
    scrollBottom();
})

//Cuando un usuario entra o sale del chat
socket.on('listPersons', function(users) {
    // console.log('Conectados en la sala: ', users);
    rederUsers(users);
})

//Mensajes privados: escuchaar
socket.on('messagePrivate', function(message) {
    console.log('MessagePrivate: ', message);
});