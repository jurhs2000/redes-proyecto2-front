import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://ancient-chamber-06356.herokuapp.com/');
//const socket = socketIO.connect('http://localhost:4000');

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

export const sendCard = ({ username, room, card, truth }) => {
  socket.emit('sendCards', { username, room, card, truth });
};

export const sendCardResult = (callback) => {
  socket.on('sendCards', (data) => {
    callback(data);
  });
}

export const changeTurn = ({ room, newUsernameTurn }) => {
  socket.emit('changeTurn', { room, username: newUsernameTurn });
};

export const startChallenge = (callback) => {
  socket.on('changeTurn', (data) => {
    callback(data);
  });
};

export const sendChallengeReq = ({ username, room, challengedUsername }) => {
  console.log('sendChallengeReq', username, room, challengedUsername);
  socket.emit('challenge', { username, room, challended: challengedUsername });
};

export const challengeRes = (callback) => {
  socket.on('challenge', (data) => {
    callback(data);
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
