const bcrypt = require('bcryptjs');

const storedHash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
const passwordToTest = 'password';

bcrypt.compare(passwordToTest, storedHash, (err, result) => {
  if (result) {
    console.log('✅ Password matches!');
  } else {
    console.log('❌ Password does not match');
  }
});