const crypto = require('crypto');

function generateSHA256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

const userInput = process.argv[2];
if (!userInput) {
  console.log("Please provide a string to hash as a command line argument.");
  process.exit(1);
}

const hash = generateSHA256(userInput);
console.log("SHA-256 Hash:", hash);
