import { CommandRetrier } from "../CommandRetrier";
import { Rotate } from "../commands/Rotate";
import { ExceptionLogger } from "../ExceptionLogger";
import { RotateExceptionHandler } from "../handlers/RotateExceptionHandler";
import { Queue } from "../Queue";

describe('RotateExceptionHandler should implement strategy:', () => {
  const queue = new Queue();
  const cmd = new Rotate();

  const exception = new Error();
  exception.name = 'Test error';
  exception.message = 'Test error description';
  
  test('- being called once it should push CommandRetrier to the queue', () => {
    const handler = new RotateExceptionHandler(queue);

    handler.handle(cmd, exception);

    const currentCommand = queue.take();
    expect(currentCommand).toBeInstanceOf(CommandRetrier);
  });

  test('- being called twice it should push CommandRetrier to the queue once again', () => {
    const handler = new RotateExceptionHandler(queue);

    handler.handle(cmd, exception);
    queue.take();

    handler.handle(cmd, exception);
    const currentCommand = queue.take();

    expect(currentCommand).toBeInstanceOf(CommandRetrier);
  });

  test('- being called after being called twice it should push ExceptionLOgger to the queue', () => {
    const handler = new RotateExceptionHandler(queue);

    handler.handle(cmd, exception);
    queue.take();

    handler.handle(cmd, exception);
    queue.take();

    handler.handle(cmd, exception);
    const currentCommand = queue.take();

    expect(currentCommand).toBeInstanceOf(ExceptionLogger);
  });
});