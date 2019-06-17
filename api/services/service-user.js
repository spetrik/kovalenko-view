const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');

const model = mongoose.model('User', {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

getAll = async (req, res) => {
  try {
    const users = await model.find().exec();
    users.forEach(user => {
      delete user._doc.password;
    });
    res.send(users);
  } catch (e) {
    res.status(500).send(e.message || e.toLocaleString());
  }
};

create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await model.findOne({email}).exec();
    if (user) {
      throw new Error(`${email} user already exists`)
    }

    const newUser = new model();
    newUser.email = email;
    newUser.password = createHash(password);
    const dbUser = await newUser.save();
    res.send(dbUser);
  } catch (e) {
    res.status(500).send(e.message || e.toLocaleString());
  }
};

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = {
  model,
  getAll,
  create
};
