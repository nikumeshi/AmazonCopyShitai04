const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.isLogin){
      req.session.isLogin = false;
  }
  const loginUserName = req.session.userName;
  let userName = 'guest';
  if (loginUserName){
      userName = loginUserName;
  }
  res.render('index',
      {
        title: 'search',
        hoge: 'nyaaaa',
        foo: 'weee',
        userName: userName,
        isLogin: req.session.isLogin
      });
});
router.post('/', function (req, res, next) {
  const keyword = req.body.keyword;
  const query = 'select * from user';
  connection.query(query, function (err, rows) {
      res.render('index',
          {
              title: 'result',
              searchResult: rows
          });
  });
});

module.exports = router;
