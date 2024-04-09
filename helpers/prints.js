import chalk from "chalk";

class OutputType {
  static INFORMATION = "INFORMATION";
  static SUCCESS = "SUCCESS";
  static ERROR = "ERROR";
  static WARNING = "WARNING";
}

function print(message, outputType) {
  switch (outputType) {
    case OutputType.INFORMATION:
      console.log(chalk.white(message));
      break;
    case OutputType.SUCCESS:
      console.log(chalk.green(message));
      break;
    case OutputType.ERROR:
      console.log(chalk.red(message));
      break;
    case OutputType.WARNING:
      console.log(chalk.yellow(message));
      break;
    default:
      console.log(message);
      break;
  }
}

export { OutputType, print };
