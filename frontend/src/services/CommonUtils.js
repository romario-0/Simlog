
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const formatDate = (date) => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    'T' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

export const getDeepValue = function (data, path) {
  for (let i = 0, key = path.split('.'), len = key.length; i < len; i++) {
    data = data[key[i]];
  };
  return data;
};

export const displayDate = (dateObj) => {
  const date = typeof dateObj === 'string' ? new Date(dateObj) : dateObj;
  const DD = `0${date.getDate()}`.slice(-2);
  const Mon = date.toLocaleString('default', { month: 'short' });
  const HH = `0${date.getHours()}`.slice(-2);
  const MM = `0${date.getMinutes()}`.slice(-2);
  return `${DD} ${Mon}, ${date.getFullYear()} ${HH}:${MM}`;
}