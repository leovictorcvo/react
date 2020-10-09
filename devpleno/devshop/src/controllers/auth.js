const userModel = require("../models/user");

const login = db => async (req, res) => {
  try {
      const {email, passwd} = req.body;
      const user = await userModel.login(db)(email, passwd);
      req.session.user = user;
      res.redirect('/');
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
};

module.exports = {
  login,
  logout
};
