import { daysRemaining } from "./dateLogic.js";

let response = await fetch("/api/balance");
let data = await response.json();

document.querySelector("#daysRemaining b").innerText = daysRemaining;

document.getElementById("total").innerText = data && data.total;

let nameEle = document.querySelector("#selectName");
let categoryEle = document.querySelector("#selectCategory");
let descriptionEle = document.querySelector("#description");
let amountEle = document.querySelector("#amountEntered");
let addExpenseButton = document.querySelector("#addExpenseButton");

addExpenseButton.addEventListener("click", async () => {
  let name = nameEle.value;
  let category = categoryEle.value;
  let description = descriptionEle.value || "";
  let amount = Number(amountEle.value);
  data.total = data.total - amount;
  let response = await fetch("/api/balance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  document.getElementById("total").innerText = data && data.total;
});
