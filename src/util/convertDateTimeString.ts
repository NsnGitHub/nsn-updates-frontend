const convertDateTimeString = (datetimeString: string) => {
  const date = new Date(datetimeString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth()).padStart(2, "0");
  const year = String(date.getFullYear());

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hour}:${minute}`;
};

export default convertDateTimeString;
