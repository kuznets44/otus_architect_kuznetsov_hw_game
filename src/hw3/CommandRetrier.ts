import { ICommand } from "./types";

export class CommandRetrier {
  private command : ICommand;
  
  constructor(cmd: ICommand) {
    this.command = cmd;
  }
  public execute() {
    this.command.execute();
  }
}