const bcrypt = require("bcryptjs");

const generatePassHash = passwd => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwd, salt);
  return hash;
};

const initialUser = db => async () => {
  const existsInDb = await db("users")
    .where("name", "Admin")
    .first();
  if (!existsInDb) {
    const user = {
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      passwd: generatePassHash(process.env.ADMIN_PASS),
      email_checked: true,
      created: new Date(),
      updated: new Date(),
      roles: "admin, financial, customer"
    };
    await db("users").insert(user);
  }
};

const login = db => async (email, passwd) => {
  const userInDb = await db("users")
    .where("email", email)
    .first();
  if (!userInDb) {
    throw new Error("Usuário ou senha inválidos");
  }
  if (!bcrypt.compareSync(passwd, userInDb.passwd)) {
    throw new Error("Usuário ou senha inválidos");
  }
  const { id, name, email_checked, roles } = userInDb;
  return {
    id,
    name,
    email,
    email_checked,
    roles
  };
};

module.exports = {
  initialUser,
  login
};
