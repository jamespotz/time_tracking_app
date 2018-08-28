import ValidateUserParams from '../../operations/validate_user_params'
import jwt from 'jsonwebtoken'
import User from '../../models/user'
import bcrypt from 'bcrypt'

export default (app) => {
  app.post('/api/sign-up', (req, res, next) => {
    const {
      first_name,
      last_name,
      email,
      password
    } = req.body

    ValidateUserParams({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }).then(result => {
      if (result) {
        User.find({
          email: email
        }).exec().then(users => {
          if (users.length >= 1) {
            return res.status(409).json({
              message: 'User exists'
            })
          } else {
            User.encryptPassword(password)
              .then(result => {
                const user = new User({
                  email: email,
                  password: result,
                  first_name: first_name,
                  last_name: last_name
                })

                user.save().then(result => {
                  res.status(201).json({
                    message: "User created"
                  });
                }).catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                })
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              })
          }
        })
      }
    }).catch(err => {
      return res.status(422).json({
        success: false,
        message: err
      })
    })
  })

  app.post('/api/sign-in', (req, res, next) => {
    const {
      email,
      password
    } = req.body

    User.find({
        email: email
      }).exec()
      .then(users => {
        if (users.length < 1) {
          return res.status(401).json({
            message: "Authentication failed"
          })
        }

        const user = users[0]

        user.verifyPassword(password)
          .then(result => {
            if (result) {
              const token = jwt.sign({
                  email: user.email,
                  userId: user._id
                },
                process.env.JWT_KEY, {
                  expiresIn: '10h'
                }
              )

              return res.status(200).json({
                message: 'Authentication successful',
                token: token
              })
            }
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
  })
}