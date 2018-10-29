import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UsersSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UsersSchema.statics.encryptPassword = function(password, callback) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      if (callback) {
        callback(err, hash);
      }
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

UsersSchema.methods.verifyPassword = function(password, callback) {
  const self = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, self.password, (err, result) => {
      if (callback) {
        callback(err, result);
      }

      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default mongoose.model('User', UsersSchema);
