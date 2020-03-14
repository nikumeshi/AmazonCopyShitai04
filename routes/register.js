const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.get('/',function (req, res, next) {
    res.render('register',
        {
            title: 'register'
        });
});

router.post('/', function (req, res, next) {
    const name = req.body.name;
    const pw = req.body.password;
    const mail = req.body.mail;

    const existsCheckQuery = `select * from users where mailaddress = "${mail}" limit 1`;
    const registerQuery = `'insert into users (userName, password, mailaddress) values("${name}","${pw}","${mail}")`;

    console.log(existsCheckQuery);
    console.log(registerQuery);

    connection.query(existsCheckQuery, function (err, mailaddress) {
        const isMailExits = mailaddress.length;
        if (isMailExits){
            res.render('register', {
               title: '新規会員登録',
               eMessage: 'そのアドレスはもう使われています'
            });
        }else {
            connection.query(registerQuery, function (err, row) {
                res.redirect('/login');
            });
        }
    });
});

module.exports = router;