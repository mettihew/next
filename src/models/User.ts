import mongoose, { CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // lowercase: true,
      // trim: true,
      // match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Only Gmail addresses are allowed'],
      // index: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      // minlength: 8,
      // select: false // Don't include in queries by default
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      // trim: true,
      // minlength: 3,
      // maxlength: 30
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1, min: 1 }
      }
    ],
    isVerified: {
      type: Boolean,
      default: false
    },

    resetToken: String,
    resetTokenExpiry: Date,

    lastLogin: Date,

    failedLoginAttempts: {
      type: Number,
      default: 0
    },

    accountLockedUntil: Date
  },
  {
    timestamps: true
  }
);

//
// 🔐 Middleware: Hash password before saving
//
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 14;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

//
// 🔍 Method: Compare raw password with hashed password
//
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) throw new Error('Password not set on user');

  return bcrypt.compare(candidatePassword, this.password);
};

//
// 🔑 Method: Create secure password reset token
//
userSchema.methods.createPasswordResetToken = function () {
  const rawToken = crypto.randomBytes(40).toString('hex');

  this.resetToken = crypto
    .createHash('sha512')
    .update(rawToken)
    .digest('hex');

  this.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

  return rawToken; // Send this to the user via email
};

export default mongoose.models.User || mongoose.model('User', userSchema);
