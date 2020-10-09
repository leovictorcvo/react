const connection = require("../database/connection");

module.exports = {
  list: async (req, res) => {
    const { page = 1 } = req.query;

    const [count] = await connection("incidents").count();

    const result = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    //a saída de console.log(count) é { 'count(*)': 1 }

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(result);
  },
  create: async (req, res) => {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const incident = { title, description, value, ong_id };
    const [id] = await connection("incidents").insert(incident);
    return res.json({ id });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "Operation not permitted" });
    }

    await connection("incidents")
      .where("id", id)
      .del();

    return res.status(204).send();
  }
};
