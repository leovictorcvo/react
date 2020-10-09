const pessoas = require("../models/pessoas");

const index = async (knex, req, res) => {
  const results = await pessoas.findAll(knex);
  res.render("pessoas/index", { pessoas: results });
};

const createForm = (req, res) => {
  res.render('pessoas/create');
};

const createPost = async (knex, req, res) => {
  await pessoas.create(knex, req.body);
  res.redirect('/pessoas');
};

const updateForm = async (knex, req, res) => {
  const pessoa = await pessoas.findById(knex, req.params.id);
  res.render('pessoas/update', {pessoa});
};

const updatePost = async (knex, req, res) => {
  await pessoas.update(knex, req.params.id, req.body);
  res.redirect('/pessoas');
};

const deleteOne = async (knex, req, res) => {
  await pessoas.deleteOne(knex, req.params.id);
  res.redirect('/pessoas');
}

module.exports = {
  index,
  createForm,
  createPost,
  updateForm,
  updatePost,
  deleteOne
};
