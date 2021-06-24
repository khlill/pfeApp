const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const userSchema = require('../../models/User');
const authorize = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// User Signin
router.post('/signin-admin', (req, res, next) => {
  let getUser;
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        msg: getUser,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    });
});

// Signup User
router.post(
  '/register-admin',
  [
    check('fname')
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage('First name must be atleast  characters long'),
    check('email', 'Email is not valid').not().isEmpty().isEmail(),
    check('password', 'Password should be between 5 to 14 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 14 }),
  ],
  [
    check('lname')
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage('Last name must be atleast  characters long'),
    check('email', 'Email is not valid').not().isEmpty().isEmail(),
    check('password', 'Password should be between 5 to 8 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 14 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        let role = 1;
        const { fname, lname, email, password } = req.body;
        const user = new User({
          fname,
          lname,
          email,
          password:hash,
          role,
        });
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: 'User successfully created!',
              result: response,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  }
);

// Get All Users
router.route('/all-user').get(authorize, (req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get A Single User
router.route('/profile-user/:id').get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Delete A User
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;