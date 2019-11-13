//https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numWithCommas = num => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

// end date object is provided
export const getDateNumAndText = endDateObj => {
  const nowDateObj = new Date();
  const timeDiff = endDateObj.getTime() - nowDateObj.getTime();
  const minDiff = timeDiff / (1000 * 60);
  const hourDiff = timeDiff / (1000 * 3600);
  const dayDiff = timeDiff / (1000 * 3600 * 24);
  let dateNum, dateText;

  if (dayDiff > 1) {
    dateNum = Math.floor(dayDiff);
    dateText = "days";
  } else if (hourDiff > 1) {
    dateNum = Math.floor(hourDiff);
    dateText = "hours";
  } else {
    dateNum = Math.floor(minDiff);
    dateText = "minutes";
  }

  return [dateNum, dateText];
};