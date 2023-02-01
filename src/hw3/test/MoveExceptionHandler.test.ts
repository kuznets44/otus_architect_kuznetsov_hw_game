import { CommandRetrier } from "../CommandRetrier";
import { Move } from "../commands/Move";
import { ExceptionLogger } from "../ExceptionLogger";
import { MoveExceptionHandler } from "../handlers/MoveExceptionHandler";
import { Queue } from "../Queue";

describe('MoveExceptionHandler should implement strategy:', () => {
  const queue = new Queue();
  const cmd = new Move();

  const exception = new Error();
  exception.name = 'Test error';
  exception.message = 'Test error description';
  
  test('- being called once it should push CommandRetrier to the queue', () => {
    const handler = new MoveExceptionHandler(queue);

    handler.handle(cmd, exception);

    const currentCommand = queue.take();
    expect(currentCommand).toBeInstanceOf(CommandRetrier);
  });

  test('- being called twice it should retry the command and write log', () => {
    const handler = new MoveExceptionHandler(queue);

    handler.handle(cmd, exception);
    queue.take();

    handler.handle(cmd, exception);
    const currentCommand = queue.take();

    expect(currentCommand).toBeInstanceOf(ExceptionLogger);
  });
});