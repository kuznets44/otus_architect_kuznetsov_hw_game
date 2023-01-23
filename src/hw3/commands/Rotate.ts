export class Rotate implements ICommand {

  public execute() {
    const error = new Error();
    error.name = 'RotateCommandError';
    error.message = 'The ROTATE command has felt with error';

    throw error;
  }
}