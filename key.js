const crypto = require('crypto');

function generateKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({ publicKey, privateKey });
      }
    });
  });
}

generateKeyPair().then(keyPair => {
  console.log("Public Key:", keyPair.publicKey);
  console.log("Private Key:", keyPair.privateKey);
}).catch(err => {
  console.error(err);
});
