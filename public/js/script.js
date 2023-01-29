import { daysRemaining } from "./dateLogic.js";
import PageElements from "./pageElements.js";
import { addExpenseFunc, addTableData } from "./pageFunctions.js";
let { totalEle, daysRemainingEle } = new PageElements();

let balanceResponse = await fetch("/api/balance");
let data = await balanceResponse.json();

let entryResponse = await fetch("/api/entry");
let entryData = await entryResponse.json();

totalEle.innerText = data && data.total;
daysRemainingEle.innerText = daysRemaining;

addTableData(await entryData);

addExpenseButton.addEventListener("click", addExpenseFunc);

export { data, entryData };
