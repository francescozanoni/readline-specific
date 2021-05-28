const fs = require('fs');
const readline = require('readline');

function createReadStream(path, callback, content) {
  const readStream = fs.createReadStream(path, {
    encoding: 'utf8',
    autoClose: false,
  })
    .on('error', (error) => {
      readStream.destroy();
      callback(error, content);
    });
  return readStream;
}

function createReadlineInterface(readStream, callback, content) {
  return readline.createInterface({
    input: readStream,
    terminal: false,
  })
    .on('close', () => {
      readStream.destroy();
      callback(null, content);
    })
    .on('error', (error) => {
      readStream.destroy();
      callback(error, content);
    });
}

module.exports = {

  oneline(path, requestedLineIndex, callback) {
    this.multilines(
      path,
      [requestedLineIndex],
      (error, content) => callback(error, content[requestedLineIndex] || ''),
    );
  },

  multilines(path, requestedLineIndexes, callback) {
    let lineIndex = 0;
    const lastLineIndex = Math.max(null, requestedLineIndexes);
    const content = {};
    const readStream = createReadStream(path, callback, content);
    try {
      const readlineInterface = createReadlineInterface(readStream, callback, content)
        .on('line', (line) => {
          lineIndex += 1;
          if (requestedLineIndexes.indexOf(lineIndex) > -1) {
            content[lineIndex] = line;
            if (lineIndex === lastLineIndex) {
              readlineInterface.close();
            }
          }
        });
    } catch (error) {
      callback(error, content);
    }
  },

  alllines(path, callback) {
    let lineIndex = 0;
    const content = {};
    content.all = '';
    content.row = {};
    const readStream = createReadStream(path, callback, content);
    try {
      createReadlineInterface(readStream, callback, content)
        .on('line', (line) => {
          lineIndex += 1;
          content.row[lineIndex] = line;
          content.all += `${line}\r\n`;
        });
    } catch (error) {
      callback(error, content);
    }
  },

};
