import { Mock } from "moq.ts";
import { IFuelBurnable, CommandException } from "../types";
import { BurnFuelCommand } from "../BurnFuelCommand";

describe('Positive: for object with fuel level of 10 and fuel expence of 3 should set fuel level of 7', () => {
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
  
  test('THEN BurnFuelCommand should lead to fuel level of 7', () => {
    new BurnFuelCommand(fuelBurnableObj).Execute();
    expect(fuelBurnableObj.fuelLevel).toBe(7);
  });
});
