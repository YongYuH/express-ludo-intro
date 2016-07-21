var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
    var userNumber = 0;
    var language = req.acceptsLanguages( 'zh-tw','zh-hk','en','en-us' );
    // if(language == 'zh-tw' | language == 'zh-hk'){
    unirest.get("https://baskarm28-typeform-v1.p.mashape.com/form/NBIykg?key=b4c58ff193ed4d038bd43d1925492329368f2c1b&completed=true&limit=10&offset=50")
        .header("X-Mashape-Key", "Rx6Hdn8AvZmshP3K2DLNtvzW5I0yp1AYG3djsnsCrAmFd118Yq")
        .header("Accept", "application/json")
        .end(function(result) {
            // var body = result.body;
            userNumber += Number(result.body.stats.responses.completed);
            // res.render('index', { userNumber: userNumber });
            unirest.get("https://baskarm28-typeform-v1.p.mashape.com/form/RmhHAY?key=b4c58ff193ed4d038bd43d1925492329368f2c1b&completed=true&limit=10&offset=50")
                .header("X-Mashape-Key", "Rx6Hdn8AvZmshP3K2DLNtvzW5I0yp1AYG3djsnsCrAmFd118Yq")
                .header("Accept", "application/json")
                .end(function(result) {
                    var body = result.body;
                    userNumber += Number(result.body.stats.responses.completed);
                    res.render('index', { userNumber: userNumber });
                });
        });
    // }
    // else{
    
    // }
});

module.exports = router;
