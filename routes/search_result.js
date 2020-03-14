const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.post('/', function (req, res, next) {
    const category = req.body.r1;
    const keyword = req.body.keyword;
    let query = 'select * from goodsMaster where ';
    if (category === '1'){
        query +=  'goodsName like \'%'+keyword+'%\'';
    }else {
        query +=  'goodsPrice =  \''+keyword+'\'';
    }
    connection.query(query, function (err, rows) {
        console.log(query);
        console.log(rows);
        res.render('searchResult',
            {
                title: 'searchResult',
                result: rows
            });
    });
});

module.exports = router;