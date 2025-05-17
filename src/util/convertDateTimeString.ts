const convertDateTimeString = (datetimeString: string) => {
  const date = new Date(datetimeString);

  const datePortion = date.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
  let timePortion = date.toLocaleTimeString("en-CA", { hour: "numeric", minute: "numeric", hour12: true });

  timePortion = timePortion.replace(/\./g, "");

  return `${datePortion} @ ${timePortion}`;
};

const getJoinMonthYearFromDateTimeString = (datetimeString: string) => {
  const date = new Date(datetimeString);

  const monthAndYear = String(date.toLocaleString("default", { month: "long", year: "numeric" }));
  return monthAndYear;
};

export { convertDateTimeString, getJoinMonthYearFromDateTimeString };
