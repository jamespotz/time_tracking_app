import User from '../models/user';
import ValidateUserParams from '../operations/validate_user_params';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generate_token from '../operations/generate_token';

exports.signUpUser = (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  ValidateUserParams({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    is_admin: is_admin,
  })
    .then(result => {
      if (result) {
        User.find({
          email: email,
        })
          .exec()
          .then(users => {
            if (users.length >= 1) {
              return res.status(409).json({
                message: 'User exists',
              });
            } else {
              User.encryptPassword(password)
                .then(result => {
                  const user = new User({
                    email: email,
                    password: result,
                    first_name: first_name,
                    last_name: last_name,
                    is_admin: is_admin,
                  });

                  user
                    .save()
                    .then(result => {
                      res.status(201).json({
                        message: 'User created',
                        token: generate_token({
                          is_admin: user.is_admin,
                          email: user.email,
                          userId: user._id,
                        }),
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err,
                      });
                    });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
      }
    })
    .catch(err => {
      return res.status(422).json({
        success: false,
        message: err,
      });
    });
};

exports.signInUser = (req, res, next) => {
  const { email, password } = req.body;

  User.find({
    email: email,
  })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }

      const user = users[0];

      user
        .verifyPassword(password)
        .then(result => {
          if (result) {
            const token = generate_token({
              is_admin: user.is_admin,
              email: user.email,
              userId: user._id,
            });
            return res.status(200).json({
              message: 'Authentication successful',
              token: token,
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
