const rl = require('../index');

const testFilePath = './tests/file.txt';

describe('alllines()', () => {
  test('read all lines', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({
        all: 'AAAA\r\nBBBB\r\nCCCC\r\n',
        row: {
          1: 'AAAA',
          2: 'BBBB',
          3: 'CCCC',
        },
      });
      expect(err).toStrictEqual(null);
      done();
    }
    rl.alllines(testFilePath, callback);
  });

  test('unavailable file', (done) => {
    function callback(err, res) {
      expect(res).toStrictEqual({
        all: '',
        row: {},
      });
      expect(err.message).toStrictEqual(expect.stringMatching(/^ENOENT: no such file or directory, open '.+unavailable.txt'$/));
      done();
    }
    rl.alllines('./tests/unavailable.txt', callback);
  });
});
