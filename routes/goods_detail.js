const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.post('/', function (req, res, next) {
    const code = req.body.code;
    let query = 'select * from goodsMaster where goodsCode = '+code;
    connection.query(query, function (err, rows) {
        res.render('goodsDetail',
            {
                title: 'goodsDetail',
                detail: rows
            });
    });
});

module.exports = router;