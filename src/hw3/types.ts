import { ErrorTypeExceptionHandler } from "./handlers/ErrorTypeExceptionHandler";

export declare interface ICommand {
  execute() : void;
}

export declare type ErrorTypeHandler = {
  errorType: String,
  handler: ErrorTypeExceptionHandler
}

