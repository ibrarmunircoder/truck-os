import * as CryptoJs from 'crypto-js';

function run() {
  const hashKey = 'changeme';
  const encryptedKey = 'changeme';

  const bytes = CryptoJs.AES.decrypt(encryptedKey, hashKey);
  const decryptedKey = bytes.toString(CryptoJs.enc.Utf8);
  // eslint-disable-next-line no-console
  console.log(decryptedKey);
}
run();
