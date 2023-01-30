import { readFile, writeFile, open } from "node:fs/promises";
import { __homeDirectory } from "../index.js";
import path from "node:path";
import { date } from "./dateLogic.js";
// import { dirnameFunction } from "./dirname.js";
import { month, year } from "./dateLogic.js";
import exp from "node:constants";

let createFile = async function () {
  try {
    let opennFile = await open(
      path.join(`${__homeDirectory}/data/entry${month}${year}.json`)
    );
    opennFile.close();
    // let readEntryFile = await readFile(
    //   path.join(`${__homeDirectory}/data/entry${month}${year}.json`)
    // );

    console.log(`entry file exists`);
  } catch {
    let writeDataFile = await writeFile(
      path.join(`${__homeDirectory}/data/entry${month}${year}.json`),
      JSON.stringify({ entry: [] })
    );

    console.log(`creating a file`);
  }
};

export { createFile };
