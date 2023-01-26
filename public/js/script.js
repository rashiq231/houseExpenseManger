let response = await fetch("/api/balance");
let data = await response.json();

// console.log(await data);

document.getElementById("total").innerText = data && data.total;
