const rl = require('../index');

const testFilePath = './tests/file.txt';

describe('oneline()', () => {
  test('read first line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('AAAA');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, 1, callback);
  });

  test('read last line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('CCCC');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, 3, callback);
  });

  test('read line after last line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, 4, callback);
  });

  test('read line 0', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, 0, callback);
  });

  test('read line -1', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, -1, callback);
  });

  test('read unavailable line', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, 100, callback);
  });

  test('invalid line format (letter)', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, 'a', callback);
  });

  test('invalid line format (array)', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err).toStrictEqual(null);
      done();
    }
    rl.oneline(testFilePath, ['a'], callback);
  });

  test('unavailable file', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual('');
      expect(err.message).toStrictEqual(expect.stringMatching(/^ENOENT: no such file or directory, open '.+unavailable.txt'$/));
      done();
    }
    rl.oneline('./tests/unavailable.txt', 1, callback);
  });
});
