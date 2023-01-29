import PageElements from "./pageElements.js";
let {
  nameEle,
  categoryEle,
  descriptionEle,
  amountEle,
  totalEle,
  addExpenseButton,
  tableBoady,
} = new PageElements();
import { data, entryData } from "./script.js";

import { categoyValues } from "../constants.js";

let addExpenseFunc = async () => {
  let name = nameEle.value;
  let category = categoryEle.value;
  let description = descriptionEle.value || "";
  let amount = Number(amountEle.value);
  data.total = data.total - amount;
  if (amountEle.value != "" && category != 0 && name != 0) {
    let balanceResponse = await fetch("/api/balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let balResData = await balanceResponse.json();
    if (balResData["total"] != Number(totalEle.innerText)) {
      totalEle.innerText = await balResData["total"];
      entryData["entry"].unshift({
        name: name,
        amountSpend: amount,
        date: new Date(Date.now()).toDateString(),
        description: description,
        category: category - 1,
      });
    }
    let addEntryResposne = await fetch("/api/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });

    if ((await addEntryResposne.status) == 200) {
      tableBoady.innerHTML = "";
      addTableData(entryData);
    }
    resetFun();
  }
};

let resetFun = function () {
  nameEle.value = "0";
  categoryEle.value = "0";
  descriptionEle.value = "";
  amountEle.value = "";
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
  </tr>`;
  }
};

export { addExpenseFunc, resetFun, addTableData };
