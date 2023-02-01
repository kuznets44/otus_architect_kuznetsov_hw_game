import { BurnFuelCommand } from "./BurnFuelCommand";
import { CheckFuelCommand } from "./CheckFuelCommand";
import { MoveCommand } from "./MoveCommand";
import { ICommand } from "./types";

export class MacroCommand implements ICommand {
  protected obj: any;

  public constructor(obj: any) {
    this.obj = obj;
  }

  public Execute(): void {
    new CheckFuelCommand(this.obj).Execute();
    new MoveCommand(this.obj).Execute();
    new BurnFuelCommand(this.obj).Execute();
  }
};
