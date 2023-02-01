import { Queue } from "./Queue";
import { ErrorTypeHandler, ICommand } from "./types";

const fs = require('fs');
require('dotenv').config();

export class ExceptionHandler {
  private config = `${__dirname}/${process.env.HW3_HANDLERS_CONFIG}`;
  private handlers: ErrorTypeHandler[] = [];
  private queue;

  constructor(queue : Queue) {
    this.queue = queue;
  }

  public getHandlers() : ErrorTypeHandler[] {
    return this.handlers;
  }

  public async init() : Promise<void> {
    const configData = fs.readFileSync(this.config).toString().split("\n");
    for await(const element of configData) {
      const [errorType, handler] = element.split("  ");

      const handlerModule = await import(`${__dirname}/handlers/${handler}.ts`);
      this.handlers.push({
        errorType: errorType,
        handler: new handlerModule[handler](this.queue),
      });
    }
  }

  public handle(cmd: ICommand, exception : Error) {
    const errorType = exception.name;
    const errorTypeHandler = this.handlers.find(item => item.errorType === errorType);

    if(errorTypeHandler !== undefined) {
      errorTypeHandler.handler.handle(cmd, exception);
    }
  }
}
