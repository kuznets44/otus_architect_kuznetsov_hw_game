import { ICommand } from "../types";

export class Move implements ICommand {
  public execute() {
    const error = new Error();
    error.name = 'MoveCommandError';
    error.message = 'The MOVE command has felt with error';

    throw error;
  }
}