const express = require('express');
const fs = require("fs");
const encoding = require('encoding-japanese');
const router = express.Router();

const toString = (bytes) => {
  return encoding.convert(bytes, {
    from: 'SJIS',
    to: 'UNICODE',
    type: 'string',
  });
};

router.post('/', function(req, res, next) {
  try {
    fs.writeFileSync("JavaTest.java", req.body.code);
    console.log('write end');
  } catch(e) {
    console.log(e);
  }
  var cmd = 'javac -encoding UTF-8 -J-Duser.language=ja JavaTest.java';
  var ret = {};
  require('child_process').exec(cmd, { encoding: 'Shift_JIS' }, (err, stdout, stderr) => {
    if (stderr && stderr.length > 0) {
      ret.error = toString(stderr);
      res.send(JSON.stringify(ret));
    } else {
      cmd = 'java JavaTest';
      require('child_process').exec(cmd, (err, stdout, stderr) => {
        ret.output = stdout;
        res.send(JSON.stringify(ret));
      })
    }
  })
});

module.exports = router;
