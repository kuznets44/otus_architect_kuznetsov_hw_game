const fs = require('fs');
require('dotenv').config();

export class ExceptionLogger {
  private file = `${__dirname}/${process.env.HW3_EXCEPTIONS_LOG}`;
  private exception: Error;


  constructor(exception: Error) {
    this.exception = exception;
  }

  public execute() : void {
    fs.appendFileSync(this.file, this.exception.toString() + "\n");
    // fs.appendFileSync(this.file, "\n\n");
  }

  public getLastError(): string {
    const fileData = fs.readFileSync(this.file).toString();

    const errors = fileData.split("\n");
    errors.pop();
    console.log('errors', errors);
    if(errors.length > 0) {
      return errors[errors.length - 1];
    }

    return '';
  }

  public clean() : void {
    fs.truncateSync(this.file, 0);
  }
}
