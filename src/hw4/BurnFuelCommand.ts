import { ICommand, IFuelBurnable } from "./types";

export class BurnFuelCommand implements ICommand {
  protected f: IFuelBurnable;

  public constructor(f: IFuelBurnable) {
    this.f = f;
  }

  public Execute(): void {
    this.f.fuelLevel = this.f.fuelLevel - this.f.fuelExpence;
  }
};
