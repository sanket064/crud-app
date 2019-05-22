module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `work` ORDER BY Date";
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('index.ejs', {
        pageTitle: 'My To Do List',
        tasks: result
      });
    });
  },
};