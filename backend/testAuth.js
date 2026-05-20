require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authapp')
  .then(() => console.log('✅ Connected'))
  .catch(err => console.log('❌ Error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  lastLogin: Date,
  loginHistory: Array
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function testLogin() {
  try {
    const email = 'admin@example.com';
    const password = 'password';

    console.log('\n🔍 Testing login for:', email);
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found in database');
      process.exit(1);
    }

    console.log('✅ User found:', {
      name: user.name,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password
    });

    // Test password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      console.log('✅ Password matches! Login should work.');
    } else {
      console.log('❌ Password does NOT match!');
      console.log('Stored hash:', user.password);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testLogin();