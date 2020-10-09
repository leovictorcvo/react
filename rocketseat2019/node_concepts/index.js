const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let reqCount = 0;

server.use((req, res, next) => {
  console.log(`Number of requests: ${++reqCount}`);
  return next();
});

getProjectById = id => projects[getProjectIndexById(id)];
getProjectIndexById = id => projects.findIndex(prj => prj.id === id);

function checkIfProjectExists(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(prj => prj.id === id);
  if (index === -1) {
    return res.status(404).send('Not found a project with this id');
  }

  req.projectIndex = index;
  req.project = projects[index];

  return next();
}

server.get('/projects/:id', checkIfProjectExists, (req, res) => {
  return res.json(req.project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const project = req.body;

  if (getProjectIndexById(project.id) !== -1) {
    return res.status(400).send('A project with this id already exists');
  }

  project.tasks = [];
  projects.push(project);
  return res.status(201).json(project);
});

server.put('/projects/:id', checkIfProjectExists, (req, res) => {
  const { title } = req.body;
  req.project.title = title;

  return res.json(req.project);
});

server.delete('/projects/:id', checkIfProjectExists, (req, res) => {
  projects.splice(req.projectIndex, 1);
  return res.send();
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.tasks.push(title);
  return res.json(req.project);
});

server.listen(3000);
