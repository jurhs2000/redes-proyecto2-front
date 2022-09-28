import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

export const getCards = ({ username, room }) => {
  socket.emit('getCards', {
    username,
    room,
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
  });
};

export const returnHand = (callback) => {
  socket.on('returnHand', (data) => {
    callback(data);
  });
};
