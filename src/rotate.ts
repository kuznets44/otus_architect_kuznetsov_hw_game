export interface IRotable {
  direction: number;
  velocity: number;
  directionsNumber: number;
};

export class Rotate {
  protected r: IRotable;

  public constructor(r: IRotable) {
    this.r = r;
  }

  public Execute(): void {
    const newDirection = this.r.direction + this.r.velocity;
    this.r.direction = newDirection % this.r.directionsNumber;
  }
};
