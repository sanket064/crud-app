const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const {getHomePage} = require('./routes/index');
const {addTaskPage, addTask, deleteTask, editTask, editTaskPage} = require('./routes/task');
const app = express();
const port = 2000;
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
});
global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/', getHomePage);
app.get('/add', addTaskPage);
app.get('/edit/:id', editTaskPage);
app.get('/delete/:id', deleteTask);

app.post('/add', addTask);
app.post('/edit/:id', editTask);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});