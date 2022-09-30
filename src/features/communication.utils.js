export const isSuccessfullResponse = (response) => {
  return response.code === '200';
};

export const dateFormat = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const _date = `0${d.getDate()}`.slice(-2);
  const hour = `0${d.getHours()}`.slice(-2);
  const minutes = `0${d.getMinutes()}`.slice(-2);
  const seconds = `0${d.getSeconds()}`.slice(-2);
  return `${_date}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

export const getCardNameFormatted = (card) => {
  return card.replace(/_/g, ' ');
};

export const getCardSymbol = (card) => {
  return card.split('_')[0];
};

export const getNextCardN = (turn) => {
  const cardNumber = ((turn + 1) % 13) + 1;
  if (cardNumber > 1 && cardNumber < 11) {
    return (cardNumber - 2) * 4;
  } else if (cardNumber === 1) {
    return 36;
  } else if (cardNumber === 11) {
    return 40;
  } else if (cardNumber === 12) {
    return 48;
  } else if (cardNumber === 13) {
    return 44;
  }
};