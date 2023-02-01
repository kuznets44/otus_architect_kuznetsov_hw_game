import { IMovable, IFuelBurnable, CommandException } from "../types";
import { Mock } from 'moq.ts';
import { LongMoveCommand } from "../LongMoveCommand";

interface IMovableFuelBurnable extends IMovable, IFuelBurnable {}

describe('Behaviour should be like:', () => {
  const mockObj = new Mock<IMovableFuelBurnable>()
  .setup(instance => instance.fuelLevel)
  .returns(10)

  .setup(instance => instance.fuelExpence)
  .returns(3)

  .setup(instance => instance.position)
  .returns([12, 5])

  .setup(instance => instance.velocity)
  .returns([1, 1])  
  
  .object();

  const cmd = new LongMoveCommand(mockObj);

  const spy = jest.spyOn(cmd, 'Execute');

  test('WHEN object has fuel level of 10', () => {
    expect(mockObj.fuelLevel).toBe(10);
  });
  
  test('AND object has fuel expence of 3', () => {
    expect(mockObj.fuelExpence).toBe(3);
  });
  
  test('THEN LongMoveComman should throw CommandException', () => {
    expect(() => cmd.Execute()).toThrow(CommandException);
  });

  test('AFTER being called 4 times (3 successful and 1 failed)', () => {
    expect(spy).toHaveBeenCalledTimes(4);
  });
});