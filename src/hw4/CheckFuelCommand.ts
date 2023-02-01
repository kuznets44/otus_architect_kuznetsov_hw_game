import { IFuelBurnable, CommandException, ICommand } from "./types";

export class CheckFuelCommand implements ICommand {
  protected f: IFuelBurnable;

  constructor (f: IFuelBurnable) {
    this.f = f;
  }

  public Execute () : void {
    if (this.f.fuelLevel < this.f.fuelExpence) {
      throw new CommandException('Fuel has gone');
    }
  }
};
