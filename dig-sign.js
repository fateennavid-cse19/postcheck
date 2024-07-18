const crypto = require('crypto');
const { promisify } = require('util');

const generateKeyPair = promisify(crypto.generateKeyPair);

async function generateSHA256(input) {
  return crypto.createHash('sha256').update(input).digest();
}

async function signData(privateKey, data) {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  sign.end();
  return sign.sign(privateKey, 'base64');
}

(async () => {
  const { publicKey, privateKey } = await generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  const inputString = process.argv[2];
  if (!inputString) {
    console.log("Please provide a string to hash and sign as a command line argument.");
    process.exit(1);
  }

  const hashedData = await generateSHA256(inputString);
  const signature = await signData(privateKey, hashedData);

  console.log("Signature:", signature);
})();
