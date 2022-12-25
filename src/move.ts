export interface IMovable {
  position: number [];
  readonly velocity: number[];
};

export class Move {
  protected m: IMovable;

  public constructor(m: IMovable) {
    this.m = m;
  }

  public Execute(): void {
    this.m.position = [
      this.m.position[0] + this.m.velocity[0],
      this.m.position[1] + this.m.velocity[1],
    ];
  }
};
