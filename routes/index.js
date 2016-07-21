var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var userNumber = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { userNumber: userNumber });
});

function get_join_number() {
    // var language = req.acceptsLanguages( 'zh-tw','zh-hk','en','en-us' );
    console.log("get join number");
    userNumber = 0;
    unirest.get("https://baskarm28-typeform-v1.p.mashape.com/form/NBIykg?key=b4c58ff193ed4d038bd43d1925492329368f2c1b&completed=true&limit=10&offset=50")
        .header("X-Mashape-Key", "Rx6Hdn8AvZmshP3K2DLNtvzW5I0yp1AYG3djsnsCrAmFd118Yq")
        .header("Accept", "application/json")
        .end(function(result) {
            userNumber += Number(result.body.stats.responses.completed);
    });
    
    
    unirest.get("https://baskarm28-typeform-v1.p.mashape.com/form/RmhHAY?key=b4c58ff193ed4d038bd43d1925492329368f2c1b&completed=true&limit=10&offset=50")
        .header("X-Mashape-Key", "Rx6Hdn8AvZmshP3K2DLNtvzW5I0yp1AYG3djsnsCrAmFd118Yq")
        .header("Accept", "application/json")
        .end(function(result) {
            var body = result.body;
            userNumber += Number(result.body.stats.responses.completed);
            
    });
}

get_join_number();
setInterval(get_join_number,60000);
module.exports = router;
