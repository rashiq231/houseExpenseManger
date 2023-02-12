export const getMethod = async function (url) {
  let response = await fetch(url);
  return await response.json();
};

export const postMethod = async function (url, bodyData) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  return await response.json();
};
