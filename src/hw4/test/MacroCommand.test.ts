import { Mock } from "moq.ts";
import { MacroCommand } from "../MacroCommand";
import { IMovable, IFuelBurnable, CommandException } from "../types";

interface IMovableFuelBurnable extends IMovable, IFuelBurnable {}

describe('Positive: for object with defined fuel level and lower fuel expence object should change its position and fuel level', () => {
  const mockObj = new Mock<IMovableFuelBurnable>()
  .setup(instance => instance.fuelLevel)
  .returns(10)

  .setup(instance => instance.fuelExpence)
  .returns(3)

  .setup(instance => instance.position)
  .returns([12, 5])

  .setup(instance => instance.velocity)
  .returns([-7, 3])  
  
  .object();

  test('WHEN object has fuel level of 10', () => {
    expect(mockObj.fuelLevel).toBe(10);
  });
  
  test('AND object has fuel expence of 3', () => {
    expect(mockObj.fuelExpence).toBe(3);
  });
  
  test('THEN object should have fuel level of 7', () => {
    new MacroCommand(mockObj).Execute();
    expect(mockObj.fuelLevel).toBe(7);
  });

  test('AND object should have position (5, 8) after being moved', () => {
    expect(mockObj.position).toStrictEqual([5, 8]);
  });
});

describe('Negative: for object having fuel level lower than fuel expence Macrocommand should throw', () => {
  const mockObj = new Mock<IMovableFuelBurnable>()
  .setup(instance => instance.fuelLevel)
  .returns(2)

  .setup(instance => instance.fuelExpence)
  .returns(3)

  .setup(instance => instance.position)
  .returns([12, 5])

  .setup(instance => instance.velocity)
  .returns([-7, 3])  
  
  .object();

  test('WHEN object has fuel level of 2', () => {
    expect(mockObj.fuelLevel).toBe(2);
  });
  
  test('AND object has fuel expence of 3', () => {
    expect(mockObj.fuelExpence).toBe(3);
  });
  
  test('THEN Macrocommand should throw CommandException', () => {
    expect(() => new MacroCommand(mockObj).Execute()).toThrow(CommandException);
  });

});
