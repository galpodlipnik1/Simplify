import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "80mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  let info = {
    "name": "simplify API",
    "time": new Date(),
    "message": "Api for simplify"
  }
  res.status(200).json(info);
});

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION_URL;

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(chalk.green(`[${new Date().toLocaleTimeString()} ]`), chalk.blue("DATABASE"), chalk.yellow("CONNECTED"), chalk.green("200"), chalk.magenta("OK"), chalk.cyan(`on port ${PORT}`)))
    .finally(() => app.listen(PORT, () => console.log(chalk.green(`[${new Date().toLocaleTimeString()} ]`), chalk.blue("SERVER"), chalk.yellow("STARTED"), chalk.green("200"), chalk.magenta("OK"), chalk.cyan(`on port ${PORT}`))))
    .catch((error) => console.log(chalk.red(error.message)));