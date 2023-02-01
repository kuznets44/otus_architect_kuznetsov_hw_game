export declare interface IMovable {
  position: number [];
  readonly velocity: number[];
};

export declare interface IFuelBurnable {
  fuelLevel: number;
  readonly fuelExpence: number;
};

export declare interface ICommand {
  Execute() : void;
}

export class CommandException {
  private message: String;
  
  constructor (message: String) {
    this.message = message;
  }
};