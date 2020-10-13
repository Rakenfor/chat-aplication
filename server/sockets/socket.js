const { io } = require('../server')
const { Users } = require('../class/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'El nombre/sala es necesario'
            })
        }

        client.join(data.room);

        let persons = users.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listPersons', users.getPersonForRoom(data.room));
        //callback(persons);
    });

    client.on('createMessage', (data) => {

        let person = users.getPerson(client.id)

        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);

    });

    client.on('disconnect', () => {

        let personRemoved = users.removePerson(client.id);

        client.broadcast.to(personRemoved.room).emit('createMessage',
            createMessage('Andmin', `${personRemoved.name} salio`)
        );

        client.broadcast.to(personRemoved.room).emit('listPersons', users.getPersonForRoom(personRemoved.room));

    });

    //Mensaje privado
    client.on('messagePrivate', (data) => {

        let person = users.getPerson(client.id);
        client.broadcast
            .to(data.for)
            .emit('messagePrivate', createMessage(person.name, data.message));
    });

});