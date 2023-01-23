import { Move } from '../commands/Move';
import { ExceptionHandler } from '../ExceptionHandler';
import { Queue } from '../Queue';

const fs = require('fs');
require('dotenv').config();

describe('Exception handler should:', () => {
  const queue = new Queue();

  test('- return array of handlers', () => {
    expect(new ExceptionHandler(queue).getHandlers()).toBeInstanceOf(Array);
  });

  test('- return number of handlers corredponfing to its config file', async () => {
    const configHandlers = fs.readFileSync(`${__dirname}/../${process.env.HW3_HANDLERS_CONFIG}`).toString().split("\n");

    const exceptionHandler = new ExceptionHandler(queue);
    await exceptionHandler.init();
    const classHandlers = exceptionHandler.getHandlers();
    
    expect(classHandlers.length).toBe(configHandlers.length);
  });

  test('- handle command MOVE by running MoveExceptionHandler.execute() method', async() => {
    const exceptionHandler = new ExceptionHandler(queue);
    await exceptionHandler.init();
    const classHandlers = exceptionHandler.getHandlers();

    const cmd = new Move();
    const exception = new Error();
    exception.name = 'MoveCommandError';
    exception.message = 'The MOVE command has felt with error';

    const moveHandler = classHandlers.find(item => item.errorType === 'MoveCommandError');
    const spy = jest.spyOn(moveHandler!.handler, 'handle');

    exceptionHandler.handle(cmd, exception);
    expect(spy).toHaveBeenCalled();
  });
});