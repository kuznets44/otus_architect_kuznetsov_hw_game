import { ICommand } from "./types";

export class Queue {

  private items : ICommand [] = [];

  public push(item: ICommand) : number {
    return this.items.push(item);
  }

  public getLength() : number {
    return this.items.length;
  }

  public take() : ICommand | undefined {
    return this.items.shift();
  }
};
