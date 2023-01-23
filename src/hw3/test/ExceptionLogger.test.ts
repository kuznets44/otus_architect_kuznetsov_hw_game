import { ExceptionLogger } from '../ExceptionLogger';

describe('Logger should:', () => {
  const exception = new Error();
  exception.name = 'Test error';
  exception.message = 'Test error description';

  test('- implement Execute method', () => {
    expect(() => new ExceptionLogger(exception).execute()).toBeDefined();
  });

  test('- implement getLastError method', () => {
    expect(() => new ExceptionLogger(exception).getLastError()).toBeDefined();
  });

  test('- write exception information to log file', () => {
    const logger = new ExceptionLogger(exception);
    logger.execute();

    expect(logger.getLastError()).not.toBe('');
  });

  test('- clear its file', () => {
    const logger = new ExceptionLogger(exception);
    logger.execute();
    logger.clean();
    expect(logger.getLastError()).toBe('');
  });
});