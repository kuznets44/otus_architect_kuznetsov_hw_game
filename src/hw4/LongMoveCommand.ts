import { BurnFuelCommand } from "./BurnFuelCommand";
import { CheckFuelCommand } from "./CheckFuelCommand";
import { MoveCommand } from "./MoveCommand";
import { CommandRetrier } from "./CommandRetrier";
import { ICommand } from "./types";

export class LongMoveCommand implements ICommand {
  protected obj: any;

  public constructor(obj: any) {
    this.obj = obj;
  }

  public Execute(): void {
    new CheckFuelCommand(this.obj).Execute();
    new MoveCommand(this.obj).Execute();
    new BurnFuelCommand(this.obj).Execute();
    new CommandRetrier(this).Execute();
  }
};
