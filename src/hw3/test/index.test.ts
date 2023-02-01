import { Move } from "../commands/Move";
import { Rotate } from "../commands/Rotate";
import { ExceptionHandler } from "../ExceptionHandler";
import { Queue } from "../Queue";


describe('Behaviour should be like:', () => {

  const cmdMove = new Move();
  const cmdRotate = new Rotate();
  
  const spyMove = jest.spyOn(cmdMove, 'execute');
  const spyRotate = jest.spyOn(cmdRotate, 'execute');

  (async () => {
    const queue = new Queue();
    const exceptionHandler = new ExceptionHandler(queue);
    await exceptionHandler.init();
    
    
    queue.push(cmdMove);
    queue.push(cmdRotate);
    
    while(queue.getLength() > 0) {
      const cmd = queue.take();
    
      if(cmd !==undefined) {
        try {
          cmd.execute();
        } catch(exception : any) {
          exceptionHandler.handle(cmd, exception);
        }  
      }
    }
  })();  

  test('- MOVE command should be executed 2 times', () => {
    expect(spyMove).toHaveBeenCalledTimes(2);
  });

  test('- MOVE command should be executed 3 times', () => {
    expect(spyRotate).toHaveBeenCalledTimes(3);
  });
});