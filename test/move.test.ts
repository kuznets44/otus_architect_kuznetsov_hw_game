import { Move, IMovable } from '../src/move';
import { Mock, It } from "moq.ts";

// 7.3.1
describe('Positive: for object with defined position and velocity move should change its final position', () => {

  const movableObj = new Mock<IMovable>()
  .setup(instance => instance.position)
  .returns([12, 5])

  .setup(instance => instance.velocity)
  .returns([-7, 3])
  
  .object();

  test('WHEN movable object has position (12, 5)', () => {
    expect(movableObj.position).toStrictEqual([12, 5]);
  });
  
  test('AND movable object has velocity (-7, 3)', () => {
    expect(movableObj.velocity).toStrictEqual([-7, 3]);
  });
  
  test('THEN movable object should have position (5, 8) after being moved', () => {
    new Move(movableObj).Execute();
    expect(movableObj.position).toStrictEqual([5, 8]);
  });  
});

// 7.3.2
describe('Negative: for object with unreadable position "move" should throw', () => {

  const movableObj = new Mock<IMovable>()
  .setup(instance => instance.position)
  .throws('Position is unreadable')

  .setup(instance => instance.velocity)
  .returns([-7, 3])

  .object();

  test('WHEN movable object has unreadable position', () => {
    expect(() => movableObj.position).toThrow();
  });
  
  test('AND movable object has velocity (-7, 3)', () => {
    expect(movableObj.velocity).toStrictEqual([-7, 3]);
  });
  
  test('THEN "move" command should throw', () => {
    expect(() => new Move(movableObj).Execute()).toThrowError('Position is unreadable');
  });  
});


// 7.3.3
describe('Negative: for object with unreadable velocity "move" should throw', () => {

  const movableObj = new Mock<IMovable>()
  .setup(instance => instance.position)
  .returns([12, 5])

  .setup(instance => instance.velocity)
  .throws('Velocity is unreadable')
  
  .object();

  test('WHEN movable object has position (12, 5)', () => {
    expect(movableObj.position).toStrictEqual([12, 5]);
  });
  
  test('AND movable object has unreadable velocity', () => {
    expect(() => movableObj.velocity).toThrow();
  });
  
  test('THEN move command should throw', () => {
    expect(() => new Move(movableObj).Execute()).toThrowError('Velocity is unreadable');
  });  

});

// 7.3.4
describe('Negative: for object with unwritable position "move" should throw', () => {
  const movableObj = new Mock<IMovable>()
  .setup(instance => instance.position)
  .returns([12, 5])

  .setup(instance => instance.velocity)
  .returns([-7, 3])

  .setup(instance => instance.position = It.IsAny())
  .throws('Position is unwritable')
  
  .object();

  test('WHEN movable object has position (12, 5)', () => {
    expect(movableObj.position).toStrictEqual([12, 5]);
  });
  
  test('AND movable object has velocity (-7, 3)', () => {
    expect(movableObj.velocity).toStrictEqual([-7, 3]);
  });

  test('AND movable object has unwritable position', () => {
    expect(() => movableObj.position = It.IsAny()).toThrow();
  });
  
  test('THEN move command should throw', () => {
    expect(() => new Move(movableObj).Execute()).toThrowError('Position is unwritable');
  });  
});