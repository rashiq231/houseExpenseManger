import path from "path";

import { fileURLToPath } from "url";

const filenameFunction = function (url) {
  return fileURLToPath(url);
};
// console.log(filenameFunction);

const dirnameFunction = function (url) {
  return path.dirname(filenameFunction(url));
};
// console.log("__directory-name", dirnameFunction);

export { filenameFunction, dirnameFunction };
