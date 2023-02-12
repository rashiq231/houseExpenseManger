import { __homeDirectory } from "../../index.js";

import { readFile } from "node:fs/promises";
import path from "node:path";

export const verifyEntryIdExists = async (req, res, next) => {
  let { filename, id } = req.params;
  try {
    let fileData = await readFile(
      path.join(__homeDirectory + `/data/entry${filename}.json`)
    );
    fileData = JSON.parse(fileData);
    for (
      let index = 0;
      index < (fileData.length < 10 ? fileData.length : 10);
      index++
    ) {
      if (fileData["entry"][index]["id"] == id) {
        req.query.index = index;
        break;
      }
    }
    if (req.query && req.query.index >= 0) {
      req.fileData = fileData;
      next();
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    console.log(req.query);
    res.status(200).send(error);
  }
};
