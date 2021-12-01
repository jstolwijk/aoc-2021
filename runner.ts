import * as CFonts from "cfonts";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { readdirSync } from "fs";

const getImplementedDays = (): number[] => {
  return readdirSync(".", { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((dir) => dir.name)
    .filter((dirName) => dirName.startsWith("day"))
    .map((it) => Number(it.replace("day", "")));
};

const header = () => {
  CFonts.say("Advent Of Code 2021", {
    font: "block",
    align: "center",
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
    gradient: "red,blue",
    independentGradient: true,
    transitionGradient: false,
    env: "node",
  });
};

const main = async () => {
  const argv = await yargs(hideBin(process.argv)).argv;

  if (!argv.day) {
    console.log(
      "Specify the day you want to run, implemented days: [" +
        getImplementedDays().join() +
        "]"
    );
  } else if (!argv.part) {
    console.log(
      "Specify which part of the exercise you want to run (either 1 or 2)"
    );
  } else {
    header();
    const day = require(`./day${argv.day}/code.ts`);
    if (argv.part === 1) {
      console.log("Answer " + day.part1());
    } else if (argv.part === 2) {
      console.log("Answer " + day.part2());
    } else {
      console.error("SHIIIIIIIIIIIIT");
    }
  }
};

main();
