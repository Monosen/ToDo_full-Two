// Create server Express
const express = require('express');
const cors = require('cors');

// Routers
const { todosRouter } = require('./routes/todos.routes');

// Utils
const { db } = require('./util/database');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/todos', todosRouter);

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Express app running');
});
// Define endpoint for ToDos
// GET fetch all ToDos
// POST Create new ToDo
// PATCH Update ToDo given an ID
// DELETE Delete ToDo given an ID (destroy or soft delete)

// Establish a connection with a Database (Postgress)

// Create ToDo model
// Use the model to interact with the controller functions

// Must structure project with routes, controllers and models folders (utils)

// IMPORTANT: Prettier format

// Install cors library (npm i cors)
// app.use(cors())
