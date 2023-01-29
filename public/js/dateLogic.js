let today = new Date(Date.now());
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let includingToday = 1;
let leapyear = () => {
  if ((year % 4 === 0 && year % 100 != 0) || year % 400 == 0) {
    return 29;
  } else {
    return 28;
  }
};
let monthLastDate = {
  0: 31,
  1: leapyear(),
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

let daysRemaining = monthLastDate[month] - date + includingToday;
export { daysRemaining };
