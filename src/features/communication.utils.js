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