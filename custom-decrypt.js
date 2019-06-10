'use strict';

var child_process = require('child_process');
var fs = require('fs');
var util = require('util');

const write = util.promisify(fs.writeFile);
( async ()=> {
  try {

    const privateKey = child_process.execSync('openssl', {input: 'ecparam -name prime256v1 -genkey -noout -out key.pem'});

  let pubBase64 = child_process.execSync('openssl', {input: 'ec -in key.pem -pubout -text -noout'});
  await write('pub.key', pubBase64);

  pubBase64 = child_process.execSync('cat pub.key | grep "pub:" -A5 | sed 1d | xxd -r -p | base64 ', {input: '| paste -sd "\0" -'});

  console.log(pubBase64.toString());
  } catch (e) {
    console.log(e.toString());
  }
})();
