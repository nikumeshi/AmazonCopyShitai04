const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.post('/', function (req, res, next) {
    if (req.session.userId){
        const userId = req.session.userId;
        const code = req.body.code;
        const quantity = req.body.quantity;
        let cartMessage = 'failed';

        console.log(req.body.detail);

        // const existCheckQuery = `select * from cart where userId = "${userId}" and goodsCode = "${code}" limit 1`;

        const insertQuery = 'insert into cart values(0,'+userId+','+code+','+quantity+',0)';
        connection.query(insertQuery, function () {
            cartMessage = 'done';
            req.session.cartMessage = cartMessage
        });
    }else {
        res.redirect('login');
    }

    //多分ここ直したら行ける
    // res.render('goodsDetail', {
    //     title: 'goodsDetail',
    //     detail: req.body.detail,
    //     cartMessage: cartMessage
    // });

    // connection.query(existCheckQuery, function (err, rows) {
    //     console.log(rows);
    //     connection.query(insertQuery, function () {
    //         cartMessage = 'done';
    //     });
    //     if (!rows.length){
    //         connection.query(insertQuery, function () {
    //             cartMessage = 'done';
    //         });
    //     }else {
    //         const updateQuantity = sum(rows[0].quantity, quantity);
    //         const updateQuery = `update cart set quantity = ${updateQuantity} where goodsCode = ${code}`;
    //         connection.query(updateQuery, function () {
    //             console.log(updateQuery);
    //             cartMessage = 'done';
    //         });
    //
    //         function sum(a,b) {
    //             return parseInt(a)+parseInt(b)
    //         }
    //     }
    //
    //     req.session.cartMessage = cartMessage;
    // });
});

module.exports = router;