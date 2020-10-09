const express = require('express');
const sqlite = require('sqlite');
const bodyParser = require('body-parser');
const path = require('path');

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), {
  Promise
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/admin', (req, res, next) => {
  if (req.hostname === 'localhost') {
    next();
  } else {
    res.send('<h2>Not allowed</h2>');
  }
});

app.get('/', async (req, res) => {
  const db = await dbConnection;
  const categoriasDb = await db.all('select * from categorias');
  const vagas = await db.all('select * from vagas');
  const categorias = categoriasDb.map(categoria => {
    return {
      ...categoria,
      vagas: vagas.filter(vaga => vaga.categoria === categoria.id)
    };
  });
  res.render('home', { categorias });
});

app.get('/vaga/:id', async (req, res) => {
  const db = await dbConnection;
  const vaga = await db.get(`select * from vagas where id = ${req.params.id}`);
  if (vaga) {
    res.render('vaga', { vaga });
  } else {
    res.send('<h1>Vaga não cadastrada</h1>');
  }
});

app.get('/admin', (req, res) => {
  res.render('admin/home');
});
app.get('/admin/categorias', async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all('select * from categorias');
  res.render('admin/categorias', { categorias });
});

app.get('/admin/vagas', async (req, res) => {
  const db = await dbConnection;
  const categoriasPromise = db.all('select * from categorias');
  const vagasPromise = db.all('select * from vagas');
  const [categorias, vagas] = await Promise.all([
    categoriasPromise,
    vagasPromise
  ]);
  res.render('admin/vagas', { vagas, categorias });
});

app.get('/admin/categorias/nova', async (req, res) => {
  res.render('admin/nova-categoria');
});

app.get('/admin/vagas/nova', async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all('select * from categorias');
  res.render('admin/nova-vaga', { categorias });
});

app.get('/admin/categorias/editar/:id', async (req, res) => {
  const db = await dbConnection;
  const categoria = await db.get(
    `select * from categorias where id=${req.params.id}`
  );
  res.render('admin/editar-categoria', { categoria });
});

app.get('/admin/vagas/editar/:id', async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all('select * from categorias');
  const vaga = await db.get(`select * from vagas where id=${req.params.id}`);
  res.render('admin/editar-vaga', { vaga, categorias });
});

app.get('/admin/categorias/delete/:id', async (req, res) => {
  const db = await dbConnection;
  await db.run(`delete from vagas where categoria=${req.params.id}`);
  await db.run(`delete from categorias where id=${req.params.id}`);
  res.redirect('/admin/categorias');
});

app.get('/admin/vagas/delete/:id', async (req, res) => {
  const db = await dbConnection;
  await db.run(`delete from vagas where id=${req.params.id}`);
  res.redirect('/admin/vagas');
});

app.post('/admin/categorias/nova', async (req, res) => {
  const { categoria } = req.body;
  const db = await dbConnection;
  await db.run(`insert into categorias (categoria) values ('${categoria}')`);
  res.redirect('/admin/categorias');
});

app.post('/admin/vagas/nova', async (req, res) => {
  const { titulo, descricao, categoria } = req.body;
  const db = await dbConnection;
  await db.run(
    `insert into vagas (titulo, descricao, categoria) values ('${titulo}', '${descricao}', ${categoria})`
  );
  res.redirect('/admin/vagas');
});

app.post('/admin/categorias/editar/:id', async (req, res) => {
  const { categoria } = req.body;
  const { id } = req.params;
  const db = await dbConnection;
  await db.run(
    `update categorias set categoria = '${categoria}' where id=${id}`
  );
  res.redirect('/admin/categorias');
});

app.post('/admin/vagas/editar/:id', async (req, res) => {
  const { titulo, descricao, categoria } = req.body;
  const { id } = req.params;
  const db = await dbConnection;
  await db.run(
    `update vagas set titulo = '${titulo}', descricao = '${descricao}', categoria = ${categoria} where id=${id}`
  );
  res.redirect('/admin/vagas');
});

const init = async () => {
  const db = await dbConnection;
  await db.run(
    'create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);'
  );
  await db.run(
    'create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);'
  );
};

init();

app.listen(SERVER_PORT, err => {
  if (err) {
    console.log('Não foi possível iniciar o servidor do Jobify', err);
  } else {
    console.log(`Servidor escutando na porta ${SERVER_PORT}`);
  }
});
