let todaysDate = new Date(Date.now()).toDateString();

let [day, month, date, year] = todaysDate.split(" ");

export { day, month, date, year };
