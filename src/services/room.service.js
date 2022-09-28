const URL = 'http://3.15.32.175';

export const createRoom = async ({ room, username }) => {
  // TODO: remove mock response
  return { code: '200', message: 'OK' };
  const response = await fetch(`${URL}/room/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ room, username }),
  });
  return response.json();
};

export const joinRoom = async ({ room, username }) => {
  // TODO: remove mock response
  return { code: '200', message: 'OK' };
  const response = await fetch(`${URL}/room/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ room, username }),
  });
  return response.json();
};
