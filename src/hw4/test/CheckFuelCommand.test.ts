import { Mock } from "moq.ts";
import { IFuelBurnable, CommandException } from "../types";
import { CheckFuelCommand } from "../CheckFuelCommand";

describe('Positive: for object with defined fuel level and lower fuel expence should not throw CommandException', () => {
  const fuelBurnableObj = new Mock<IFuelBurnable>()
  .setup(instance => instance.fuelLevel)
  .returns(10)

  .setup(instance => instance.fuelExpence)
  .returns(3)
  
  .object();

  test('WHEN object has fuel level of 10', () => {
    expect(fuelBurnableObj.fuelLevel).toBe(10);
  });
  
  test('AND object has fuel expence of 3', () => {
    expect(fuelBurnableObj.fuelExpence).toBe(3);
  });
  
  test('THEN CheckFuelCommand should not throw', () => {
    expect(() => new CheckFuelCommand(fuelBurnableObj).Execute()).not.toThrow();
  });
});

describe('Negative: for object with defined fuel level and higher fuel expence should throw CommandException', () => {
  const fuelBurnableObj = new Mock<IFuelBurnable>()
  .setup(instance => instance.fuelLevel)
  .returns(2)

  .setup(instance => instance.fuelExpence)
  .returns(3)
  
  .object();

  test('WHEN object has fuel level of 2', () => {
    expect(fuelBurnableObj.fuelLevel).toBe(2);
  });
  
  test('AND object has fuel expence of 3', () => {
    expect(fuelBurnableObj.fuelExpence).toBe(3);
  });
  
  test('THEN CheckFuelCommand should throw CommandException', () => {
    expect(() => new CheckFuelCommand(fuelBurnableObj).Execute()).toThrow(CommandException);
  });
});