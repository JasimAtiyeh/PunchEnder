//https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numWithCommas = num => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

// end date object is provided
export const getDateNumAndText = dateObj => {
  const nowDateObj = new Date();
  const timeDiff = dateObj.getTime() - nowDateObj.getTime();
  const secDiff = Math.abs(timeDiff / (1000));
  const minDiff = Math.abs(timeDiff / (1000 * 60));
  const hourDiff = Math.abs(timeDiff / (1000 * 3600));
  const dayDiff = Math.abs(timeDiff / (1000 * 3600 * 24));
  let dateNum, dateText;

  if (dayDiff > 1) {
    dateNum = Math.floor(dayDiff);
    dateText = "days";
  } else if (hourDiff > 1) {
    dateNum = Math.floor(hourDiff);
    dateText = "hours";
  } else if(minDiff > 1) {
    dateNum = Math.floor(minDiff);
    dateText = "minutes";
  } else {
    dateNum = Math.floor(secDiff);
    dateText = "seconds"
  }

  return [dateNum, dateText];
};