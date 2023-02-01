import { ICommand } from "./types";

export class CommandRetrier implements ICommand {
  private command : ICommand;
  
  constructor(cmd: ICommand) {
    this.command = cmd;
  }
  public Execute() {
    this.command.Execute();
  }
}