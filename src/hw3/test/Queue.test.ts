import { Move } from '../commands/Move';
import { Rotate } from '../commands/Rotate';
import { Queue } from '../Queue';

describe('Queue should can return its length, push and take elements', () => {
  
  test("Empty queue's length should be equal 0", () =>{
    expect(new Queue().getLength()).toBe(0);
  });

  test('getLength should return 1 after pushing element to it', () => {
    const queue = new Queue();
    queue.push(new Move());
    expect(queue.getLength()).toBe(1);
  });

  test('push method should return the current lenth of the queue', () => {
    const queue = new Queue();
    queue.push(new Move());
    expect(queue.push(new Move())).toBe(2);
  });

  test('Take method should return the first element of the queue', () => {
    const queue = new Queue();
    
    const cmdRotate = new Rotate();
    const cmdMove = new Move();
    
    queue.push(cmdRotate);
    queue.push(cmdMove);

    expect(queue.take()).toBe(cmdRotate);
  });

  test('Take method on empty queue should return undefined', () => {
    expect(new Queue().take()).toBeUndefined();
  });
});