const bcrypt = require('bcryptjs');

async function createHash() {
  const password = 'password';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log('=================================');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('=================================');
  console.log('\nCopy the hash above and use it in MongoDB Compass');
}

createHash();