const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.get('/', function (req, res, next) {
    if (req.session.userId){
        res.redirect('/');
    }else {
        res.render('login',
            {
                title: 'ログイン'
            });
    }
});

router.post('/', function (req, res, next) {
    const mail = req.body.mail;
    const password = req.body.password;
    const query = `select userId, userName from users where mailaddress = "${mail}" AND password = "${password}" limit 1`;
    connection.query(query, function (err, rows) {
        const userId = rows.length ? rows[0].userId : false ;
        console.log(rows[0]);
        if (userId){
            req.session.userId = userId;
            req.session.userName = rows[0].userName;
            req.session.isLogin = true;
            res.redirect('/');
        }else {
            res.render('login',
                {
                    title: 'ログイン',
                    noUser: 'メアドが一致するユーザがいない'
                });
        }
    });
});

module.exports = router;