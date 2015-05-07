var fs = require('fs');
var readline = require('readline');

var readl = {
  oneline: function(path, row, callback) {
    var i = 0;
    var content = '';
    var rs = fs.createReadStream(path, {
      encoding: 'utf8',
      autoClose: false
    }).on('error', function(err) {
      rs.destroy();
      callback(err, content)
    });
    path = null;
    try {
      readline.createInterface({
        input: rs,
        terminal: false
      }).on('line', function(line) {
        ++i;
        if (row == i) {
          try {
            content = line;
          } catch (e) {
            console.error(e);
          }
          this.close();
        }
      }).on('close', function() {
        rs.destroy();
        callback(null, content)
      }).on('error', function(err) {
        rs.destroy();
        callback(err, content)
      });
    } catch (err) {
      console.error(err);
      callback(err, content)
    }
  }
}

module.exports = readl;