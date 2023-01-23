import { ICommand } from "../types";
import { ErrorTypeExceptionHandler } from "./ErrorTypeExceptionHandler";

export class RotateExceptionHandler extends ErrorTypeExceptionHandler {
  private counter = 0;

  public handle(cmd : ICommand, exception : Error) : void {
    if(this.counter <= 1) {
      this.retryCommand(cmd);
      this.counter++;
    } else {
      this.writeLog(exception);
      this.counter = 0;
    }
  }
}