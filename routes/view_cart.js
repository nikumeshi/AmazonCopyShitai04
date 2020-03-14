const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.post('/', function (req, res, next) {
    if (req.session.isLogin){
        const userId = req.session.userId;
        const sumCart = `select goodsCode,sum(quantity) as total from cart where userId=${userId} and isOrdered=0 group by goodsCode`;
        console.log(sumCart);

        connection.query(sumCart, function (err, rows) {
            console.log(rows);
            res.render('viewCart',{
                title:'cartContent',
                cartContent: rows
            });
        });

    }else {
        res.redirect('login');
    }
});


module.exports = router;