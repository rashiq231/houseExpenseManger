import { Router } from "express";
import { rm, readFile, writeFile } from "node:fs/promises";

import { __homeDirectory } from "../index.js";
import path from "node:path";

import { month, year } from "../utils/dateLogic.js";

import { createFile } from "../utils/createFile.js";

import { verifyEntryIdExists } from "./middlewareFunctions/entryMiddleware.js";
// const __dirname = dirnameFunction(import.meta.url);

const router = Router();
router.use((req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  try {
    let data = await readFile(
      path.join(__homeDirectory + `/data/entry${month}${year}.json`)
    );
    res.send(JSON.parse(data));
  } catch {
    await createFile();
    let data = await readFile(
      path.join(__homeDirectory + `/data/entry${month}${year}.json`)
    );
    console.log(await JSON.parse(data));
    res.send(JSON.parse(data));
  }
});

router.post("/", async (req, res) => {
  await writeFile(
    path.join(__homeDirectory + `/data/entry${month}${year}.json`),
    JSON.stringify(req.body)
  );
  res.status(200).send(req.body);
});

router.get("/:fileName", async (req, res) => {
  console.log("in get filename request");
  let filename = req.params && req.params.fileName;
  let data = await readFile(
    path.join(__homeDirectory + `/data/${filename}.json`)
  );
  res.send(JSON.parse(data));
});

router.delete("/:fileName", async (req, res) => {
  console.log("in delete request");
  let fileName = req.params && req.params.fileName;
  let removeFile = await rm(
    path.join(__homeDirectory + `/data/${fileName}.json`),
    { recursive: true, force: true }
  );
  res.status(200).send("file deleted");
});

router.delete("/:filename/id/:id", verifyEntryIdExists, async (req, res) => {
  let { filename, id } = req.params;
  let index = req.query.index;
  let dataArray = req.fileData.entry;
  let updatedArray = {
    entry: dataArray.slice(0, index).concat(dataArray.slice(index + 1)),
  };
  await writeFile(
    path.join(__homeDirectory + `/data/entry${month}${year}.json`),
    JSON.stringify(updatedArray)
  );
  res.status(200).send(updatedArray);
});

router.put("/:fileName", async (req, res) => {
  let fileName = req.params && req.params.fileName;
  let writedataFile = await writeFile(
    path.join(__homeDirectory + `/data/${fileName}.json`),
    `{"entry":[]}`
  );
  res.status(200).send(JSON.stringify(writedataFile));
});

export default router;
