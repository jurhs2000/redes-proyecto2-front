import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

export const joinRoom = ({ username, room }) => {
  socket.emit('joinRoom', { room, username });
};

export const getCards = ({ username, room }) => {
  socket.emit('getCards', {
    username,
    room,
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
  });
};

export const returnHand = (callback) => {
  socket.on('getCards', (data) => {
    callback(data);
  });
};

export const getMessage = (callback) => {
  socket.on('message', (data) => {
    callback(data);
  });
};

export const getMessages = (callback) => {
  socket.on('messages', (data) => {
    callback(data);
  });
};

export const sendMessageRoom = ({ username, room, text, date }) => {
  socket.emit('chat', { username, room, text, date });
};

export const getError = (callback) => {
  socket.on('error', (data) => {
    callback(data);
  });
};

export const reqRoomUsers = (room) => {
  socket.emit('roomUsers', { room });
};

export const getRoomUsers = (callback) => {
  socket.on('roomUsers', (data) => {
    callback(data);
  });
};