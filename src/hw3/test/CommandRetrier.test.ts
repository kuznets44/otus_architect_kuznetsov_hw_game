import { CommandRetrier } from "../CommandRetrier";
import { Move } from "../commands/Move";

describe('Command retrier should:', () => {
  test('- execute the specified command', () => {

    const cmd = new Move();
    const spy = jest.spyOn(cmd, 'execute');

    try {
      new CommandRetrier(cmd).execute();
    } catch(e) {
      
    }
    finally {
      expect(spy).toHaveBeenCalled();
    }
  });
});