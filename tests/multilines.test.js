const rl = require('../index');

const testFilePath = './tests/file.txt';

describe('multilines()', () => {
  test('read first line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({ 1: 'AAAA' });
      expect(err).toStrictEqual(null);
      done();
    }
    rl.multilines(testFilePath, [1], callback);
  });

  test('read last line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({ 3: 'CCCC' });
      expect(err).toStrictEqual(null);
      done();
    }
    rl.multilines(testFilePath, [3], callback);
  });

  test('read first and last line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({
        1: 'AAAA',
        3: 'CCCC',
      });
      expect(err).toStrictEqual(null);
      done();
    }
    rl.multilines(testFilePath, [1, 3], callback);
  });

  test('read unavailable line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({});
      expect(err).toStrictEqual(null);
      done();
    }
    rl.multilines(testFilePath, [100], callback);
  });

  test('invalid line format (letter)', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({});
      expect(err).toStrictEqual(null);
      done();
    }
    rl.multilines(testFilePath, ['a'], callback);
  });

  test('invalid line format (array)', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({});
      expect(err).toStrictEqual(null);
      done();
    }
    rl.multilines(testFilePath, [[]], callback);
  });

  test('unavailable file', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({});
      expect(err.message).toStrictEqual(expect.stringMatching(/^ENOENT: no such file or directory, open '.+unavailable.txt'$/));
      done();
    }
    rl.multilines('./tests/unavailable.txt', [1], callback);
  });
});
