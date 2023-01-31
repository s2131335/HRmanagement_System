const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserCredentialSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, 'Username must be entered'],
        unique: true,
      },
      password: {
        type: String,
        minlength: [8, 'To short'],
        // select: false,
      },
      role: {
        type: String,
        default: 'USER',
      },
      token: {
        type: String,
      },
      resetlink: {
        type: String,
        default: '',
      },
      database: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'model_type',
      },
      model_type: {  
        type: String, 
        enum: ['CompanyData', 'CandidateData', 'NA'], 
        required: true },
      file: {
        type: Buffer,
        default: null,
      },
      ir56e: {
        type: Buffer,
        default: null,
      },
    }
  );

UserCredentialSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// JWT token generation
UserCredentialSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString(),username: user.username, role: user.role}, 'authkey' );
  user.tokens = token;
  await user.save();
  console.log("gentoken");
  return token;
};

UserCredentialSchema.statics.findByCredentials = async (username, password) => {
  const user = await mongoose.model('UserCredential', UserCredentialSchema).findOne({'username': username});
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

UserCredentialSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }
module.exports = mongoose.model('UserCredential', UserCredentialSchema);
