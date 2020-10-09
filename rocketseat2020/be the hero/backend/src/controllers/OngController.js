const crypto = require("crypto");

const connection = require("../database/connection");

module.exports = {
  list: async (req, res) => {
    const ongs = await connection("ongs").select();
    res.json(ongs);
  },

  create: async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");
    const ong = { id, name, email, whatsapp, city, uf };

    await connection("ongs").insert(ong);
    return res.json({ id });
  }
};
