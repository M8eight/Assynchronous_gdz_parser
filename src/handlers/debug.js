import process from "process";
import chalk from "chalk";

const commandArgs = process.argv[2];

export function urlCondDebug(text) {
    if (commandArgs == "url") {
        console.log(chalk.blue(text));
    }
}

export function printCondDebug(text, variable) {
    if (commandArgs == "url") {
        console.log(chalk.blue(text));
        console.log(chalk.yellow(variable));
    }
}