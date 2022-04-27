import chalk from "chalk";

export function text (text, color = 'yellow') {
    switch (color) {
        case 'yellow':
            return chalk.yellow(text);

        case 'red':
            return chalk.red(text);
    
        default:
            break;
    }
}