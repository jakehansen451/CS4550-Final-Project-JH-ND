const localFromUTCDateTime = (date, time, format = '') => {
  const ISOStr = `${date}T${time}Z`;
  const datetime = new Date(ISOStr);
  return datetime.toLocaleTimeString(format);
};

const UTCFromLocalTime = (date, time) => {
  const d = new Date(date.concat(' ', time));
  const millis = d.getUTCMilliseconds().toString().padStart(3, '0');
  const str = d.toUTCString().split(' ')[4].concat('.', millis);
  return str;
};

export {
  localFromUTCDateTime,
  UTCFromLocalTime
};