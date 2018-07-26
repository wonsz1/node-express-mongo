console.log('Server runing');

const express = require('express');
const mongoClient = require('mongodb');
const bodyParser = require('body-parser');
const app = express();

/**
 * Middleware
 * These things are basically plugins that change the request or response 
 * object before they get handled by our application. 
 */
app.use(bodyParser.urlencoded({extended: true}));

//serve files from public dir
app.use(express.static('public'));

//connect to the db an start express server
let db;
//const url = 'mongodb://aadmin:zxc123@127.0.0.1:27017/example_db';
const url = 'mongodb://aadmin:zxc123@ds217560.mlab.com:17560/example_db';
//const url =  'mongodb://user:password@mongo_address:mongo_port/databaseName';
//const url =  'mongodb://localhost:21017/databaseName';

mongoClient.connect(url, (err, database) => {
    if(err) {
        return console.log(err);
    }
    db = database.db('example_db');
    
    //start express web server 
    app.listen(8080, () => {
        console.log('listening on 8080');
    });
});


//server homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req,res) => {
    const click = {
        clickTime: new Date()
    };
    console.log(click);
    //console.log(db);

    db.collection('clicks').save(click, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log('click added to db');
        res.sendStatus(201);
    });
});

app.get('/clicks', (req, res) => {
    db.collection('clicks').find().toArray((err, result) => {
        if(err) return console.log(err);

        res.send(result);
    })
})

app.post('/quotes', (req, res) => {
    console.log(req.body);
    db.collection('quotes').save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log('quote added to db');
        res.sendStatus(201);
    });
});

app.get('/quotes', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if(err) return console.log(err);

        res.send(result);
    })
})