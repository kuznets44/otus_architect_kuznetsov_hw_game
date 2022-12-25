import { Rotate, IRotable } from '../src/rotate';
import { Mock, It } from "moq.ts";

// 8.3.1
describe('Positive: for object with defined direction and velocity "Rotate" should change its direction', () => {

  const rotableObj = new Mock<IRotable>()
  .setup(instance => instance.directionsNumber)
  .returns(8)

  .setup(instance => instance.direction)
  .returns(1)

  .setup(instance => instance.velocity)
  .returns(2)
  
  .object();

  test('WHEN rotable object has direction 1)', () => {
    expect(rotableObj.direction).toEqual(1);
  });
  
  test('AND total directions is 8', () => {
    expect(rotableObj.directionsNumber).toEqual(8);
  });

  test('AND angular velocity is 2', () => {
    expect(rotableObj.velocity).toEqual(2);
  });
  
  test('THEN movable object should have direction 3 after being rotated', () => {
    new Rotate(rotableObj).Execute();
    expect(rotableObj.direction).toEqual(3);
  });  
});

// 8.3.2
describe('Negative: for object with unreadable direction "rotate" should throw', () => {

  const rotableObj = new Mock<IRotable>()
  .setup(instance => instance.directionsNumber)
  .returns(8)

  .setup(instance => instance.direction)
  .throws('Direction is unreadable')

  .setup(instance => instance.velocity)
  .returns(2)
  
  .object();

  test('WHEN rotable object has unreadable direction', () => {
    expect(() => rotableObj.direction).toThrow();
  });
  
  test('AND total directions is 8', () => {
    expect(rotableObj.directionsNumber).toEqual(8);
  });

  test('AND angular velocity is 2', () => {
    expect(rotableObj.velocity).toEqual(2);
  });
  
  test('THEN "rotate" command should throw', () => {
    expect(() => new Rotate(rotableObj).Execute()).toThrowError('Direction is unreadable');
  });  
});


// 8.3.3
describe('Negative: for object with unreadable velocity "rotate" should throw', () => {

  const rotableObj = new Mock<IRotable>()
  .setup(instance => instance.directionsNumber)
  .returns(8)

  .setup(instance => instance.direction)
  .returns(1)

  .setup(instance => instance.velocity)
  .throws('Velocity is unreadable')
  
  .object();

  test('WHEN rotable object has direction 1)', () => {
    expect(rotableObj.direction).toEqual(1);
  });
  
  test('AND total directions is 8', () => {
    expect(rotableObj.directionsNumber).toEqual(8);
  });

  test('AND angular velocity is unreadable', () => {
    expect(() => rotableObj.velocity).toThrow();
  });
  
  test('THEN "rotate" command should throw', () => {
    expect(() => new Rotate(rotableObj).Execute()).toThrowError('Velocity is unreadable');
  });  
});

// 8.3.4
describe('Negative: for object with unwritable direction "rotate" should throw', () => {
  const rotableObj = new Mock<IRotable>()
  .setup(instance => instance.directionsNumber)
  .returns(8)

  .setup(instance => instance.direction)
  .returns(1)

  .setup(instance => instance.velocity)
  .returns(2)

  .setup(instance => instance.direction = It.IsAny())
  .throws('Direction is unwritable')
  
  .object();

  test('WHEN rotable object has direction 1)', () => {
    expect(rotableObj.direction).toEqual(1);
  });
  
  test('AND total directions is 8', () => {
    expect(rotableObj.directionsNumber).toEqual(8);
  });

  test('AND angular velocity is 2', () => {
    expect(rotableObj.velocity).toEqual(2);
  });

  test('AND object has unwritable direction', () => {
    expect(() => rotableObj.direction = It.IsAny()).toThrow();
  });
  
  test('THEN rotate command should throw', () => {
    expect(() => new Rotate(rotableObj).Execute()).toThrowError('Direction is unwritable');
  });  
});