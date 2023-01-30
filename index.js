import { filenameFunction, dirnameFunction } from "./utils/dirname.js";
import apiRoutes from "./routes/index.js";
const __dirname = dirnameFunction(import.meta.url);

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("app started");
});

export { __dirname as __homeDirectory };
