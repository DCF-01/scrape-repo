var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const { handleGet } = require('../controllers/baseController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', data: {title: 'empty', crypto: 'empty', context: 'empty'} });
});

router.get('/get', function(req, res, next) {
    let url = req.query.from;
    let responseObect;
    axios.get(url)
        .then((response) => {
            res.render('index', {title: 'Crypto context', data: handleGet(response.data, url)})
        })
        .catch((err) => {
            console.log(err);
            res.render('index', {title: 'Crypto context', data: 'there was an error'});
        })
  
  



});


module.exports = router;
