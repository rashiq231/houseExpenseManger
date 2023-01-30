import { Router } from "express";
import { rm, readFile, writeFile } from "node:fs/promises";

import { __homeDirectory } from "../index.js";
import path from "node:path";

import { month, year } from "../utils/dateLogic.js";

import { createFile } from "../utils/createFile.js";

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
    createFile();
    let data = await readFile(
      path.join(__homeDirectory + `/data/entry${month}${year}.json`)
    );
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

router.put("/:fileName", async (req, res) => {
  let fileName = req.params && req.params.fileName;
  let writedataFile = await writeFile(
    path.join(__homeDirectory + `/data/${fileName}.json`),
    `{"entry":[]}`
  );
  res.status(200).send(JSON.stringify(writedataFile));
});

export default router;
