import PageElements from "./pageElements.js";
let {
  nameEle,
  categoryEle,
  descriptionEle,
  amountEle,
  totalEle,
  addExpenseButton,
  amountAdded,
  tableBoady,
} = new PageElements();
import { data, entryData } from "./script.js";

import { categoyValues } from "../constants.js";

import { postMethod } from "./fetchMethods.js";

let addExpenseFunc = async () => {
  let name = nameEle.value;
  let category = categoryEle.value;
  let description = descriptionEle.value || "";
  let amount = Number(amountEle.value);

  if (amountEle.value != "" && category != 0 && name != 0) {
    if (amount < 0) {
      data.amountAdded = data.amountAdded - amount;
      console.log(data.amountAdded);
      amountAdded.innerText = data.amountAdded;
    }
    data.remainingAmount = data.remainingAmount - amount;

    entryData["entry"].unshift({
      name: name,
      amountSpend: amount,
      date: new Date(Date.now()).toDateString(),
      description: description,
      category: category - 1,
      id: Date.now(),
    });

    Promise.all([
      postMethod("/api/balance", data),
      postMethod("/api/entry", entryData),
    ])
      .then((resolve) => {
        console.log(resolve);
        resetFun();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

let resetFun = function () {
  location.reload();
};

let addTableData = function (tableData) {
  let lengthCalculated =
    tableData["entry"].length <= 10 ? tableData["entry"].length : 10;
  for (let index = 0; index < lengthCalculated; index++) {
    tableBoady.innerHTML += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${tableData["entry"][index]["date"]}</td>
    <td>${tableData["entry"][index]["name"]}</td>
    <td>${categoyValues[tableData["entry"][index]["category"]]}</td>
    <td>${tableData["entry"][index]["description"]}</td>
    <td>${tableData["entry"][index]["amountSpend"]}</td>
    <td  class= "delete-icon" data-value=${
      tableData["entry"][index]["id"]
    }> <button><img src="/images/delete.png" alt="delete"></button></td>
    
  </tr>`;
  }
};

let deleteAnExpenseRow = function () {};

export { addExpenseFunc, resetFun, addTableData };
