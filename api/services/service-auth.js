const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const userService = require('./service-user');

login = async (req, res) => {
  try {
    const user = await userService.model.where({email: req.body.email}).findOne().exec();
    if (user) {
      if (isValidPassword(user, req.body.password))
      {
        // const token = jwt.sign({sub: user.email}, process.env.SECRET_KEY);
        const result = user.toObject();
        delete result.password;
        result.token = jwt.sign({sub: user.email}, process.env.SECRET_KEY);
        res.send(result);
      } else {
        res.status(400).send('Password is incorrect');
      }
    } else {
      res.status(400).send('Email is incorrect');
    }
  } catch (e) {
    res.status(500).send(e.message || e.toLocaleString());
  }
};

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

module.exports = {
  login
};
