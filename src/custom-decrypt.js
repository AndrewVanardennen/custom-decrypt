import {execSync} from 'child_process';
import {writeFile} from 'fs';
import {promisify} from 'util'

const write = promisify(writeFile);
( async ()=> {
  try {

    const privateKey = execSync('openssl', {input: 'ecparam -name prime256v1 -genkey -noout -out key.pem'});

  let pubBase64 = execSync('openssl', {input: 'ec -in key.pem -pubout -text -noout'});
  await write('pub.key', pubBase64);

  pubBase64 = execSync('cat pub.key | grep "pub:" -A5 | sed 1d | xxd -r -p | base64 ', {input: '| paste -sd "\0" -'});

  console.log(pubBase64.toString());
  } catch (e) {
    console.log(e.toString());
  }
})();
