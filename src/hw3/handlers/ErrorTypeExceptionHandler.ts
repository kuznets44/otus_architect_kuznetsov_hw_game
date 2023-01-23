import { Queue } from "../Queue";
import { ICommand } from "../types";
import { CommandRetrier } from "../CommandRetrier";
import { ExceptionLogger } from "../ExceptionLogger";

export abstract class ErrorTypeExceptionHandler {
  private queue : Queue;  
  public abstract handle(cmd : ICommand, exception : Error) : void;

  constructor(queue : Queue) {
    this.queue = queue;
  }


  protected retryCommand(cmd : ICommand) : void {
    this.queue.push(new CommandRetrier(cmd));
  }

  protected writeLog(exception: Error) {
    this.queue.push(new ExceptionLogger(exception));
  }
}