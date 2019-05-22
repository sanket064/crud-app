const fs = require('fs');
module.exports = {
  addTaskPage: (req, res) => {
    res.render('add-task.ejs', {
      pageTitle: 'Add a Task',
      message: ''
    });
  },
  addTask: (req, res) => {
    let message = '';
    let name = req.body.name;
    let description = req.body.description;
    let date = req.body.date;

    
    let query = "INSERT INTO `work` (name, description, date ) VALUES ('" + name + "', '" + description + "', '" + date + "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },
  editTaskPage: (req, res) => {
    let workId = req.params.id;
    let query = "SELECT * FROM `work` WHERE id = '" + workId + "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('edit-task.ejs', {
        pageTitle: 'Edit Task',
        task: result[0],
        message: ''
      });
    });
  },
  editTask: (req, res) => {
    let workId = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let date = req.body.date;
    let query = "UPDATE `work` SET `name` = '" + name + "', `description` = '" + description + "', `date` = '" + date + "' WHERE `id` = '" + workId + "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },
  deleteTask: (req, res) => {
    let workId = req.params.id;
    let deleteQuery = 'DELETE FROM work WHERE id = "' + workId + '"';
    db.query(deleteQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  }
}