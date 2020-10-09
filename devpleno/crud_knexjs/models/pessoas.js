const findAll = knex => knex('pessoas');

const findById = (knex, id) => new Promise(async (resolve, reject) => {
  await knex('pessoas').where({id}).first().then(result => {
        const {nome, nascimento, cargo} = result; 
        const data = new Date(nascimento).toISOString().substring(0,10);
        resolve({
          nome, 
          nascimento: data,
          cargo
        });
    }).catch(err => reject(err))
}); 

const create = (knex, data) => {
  return knex('pessoas').insert(data);
};

const update = (knex, id, data) => knex('pessoas').where({id}).update(data);

const deleteOne = (knex, id) => knex('pessoas').where({id}).del();

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteOne
};
