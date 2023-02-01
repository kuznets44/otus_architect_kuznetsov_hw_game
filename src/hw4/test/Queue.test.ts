import { Queue } from '../Queue';
import { Mock } from 'moq.ts';
import { IFuelBurnable } from '../types';
import { CheckFuelCommand } from '../CheckFuelCommand';
import { BurnFuelCommand } from '../BurnFuelCommand';

describe('Queue should can return its length, push and take elements', () => {

  const mockObj = new Mock<IFuelBurnable>()
  .setup(instance => instance.fuelLevel)
  .returns(10)

  .setup(instance => instance.fuelExpence)
  .returns(3)
  
  .object();
  
  test("Empty queue's length should be equal 0", () =>{
    expect(new Queue().getLength()).toBe(0);
  });

  test('getLength should return 1 after pushing element to it', () => {
    const queue = new Queue();
    queue.push(new CheckFuelCommand(mockObj));
    expect(queue.getLength()).toBe(1);
  });

  test('push method should return the current lenth of the queue', () => {
    const queue = new Queue();
    queue.push(new CheckFuelCommand(mockObj));
    expect(queue.push(new CheckFuelCommand(mockObj))).toBe(2);
  });

  test('Take method should return the first element of the queue', () => {
    const queue = new Queue();
    
    const cmdCheck = new CheckFuelCommand(mockObj);
    const cmdBurn = new BurnFuelCommand(mockObj);
    
    queue.push(cmdCheck);
    queue.push(cmdBurn);

    expect(queue.take()).toBe(cmdCheck);
  });

  test('Take method on empty queue should return undefined', () => {
    expect(new Queue().take()).toBeUndefined();
  });
});