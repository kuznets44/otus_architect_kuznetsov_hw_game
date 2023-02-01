import { MoveCommand } from "../MoveCommand";
import { CommandRetrier } from "../CommandRetrier";
import { Mock } from 'moq.ts';
import { IMovable } from "../types"; 

describe('Command retrier should:', () => {
  test('- execute the specified command', () => {

    const mockObj = new Mock<IMovable>()
    .setup(instance => instance.position)
    .returns([12, 5])

    .setup(instance => instance.velocity)
    .returns([-7, 3])
    
    .object();

    const cmd = new MoveCommand(mockObj);
    const spy = jest.spyOn(cmd, 'Execute');

    try {
      new CommandRetrier(cmd).Execute();
    } catch(e) {
      
    }
    finally {
      expect(spy).toHaveBeenCalled();
    }
  });
});