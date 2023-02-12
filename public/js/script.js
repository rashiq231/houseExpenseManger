import { daysRemaining } from "./dateLogic.js";
import PageElements from "./pageElements.js";
import { addExpenseFunc, addTableData } from "./pageFunctions.js";
import { getMethod } from "./fetchMethods.js";
let { totalEle, daysRemainingEle, amountAdded } = new PageElements();

let data, entryData;
try {
  [data, entryData] = await Promise.all([
    getMethod("/api/balance"),
    getMethod("/api/entry"),
  ]);
} catch (error) {
  console.log(error);
}

totalEle.innerText = data && data.remainingAmount;
amountAdded.innerText = data && data.amountAdded;

daysRemainingEle.innerText = daysRemaining;

addTableData(await entryData);

addExpenseButton.addEventListener("click", addExpenseFunc);

let deleteicons = document.querySelectorAll(".delete-icon");
for (let i = 0; i < deleteicons.length; i++) {
  deleteicons[i].addEventListener("click", function () {
    this.parentNode.remove();
  });
}
export { data, entryData };
