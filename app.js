const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || "3000";

app.use('/public', express.static(path.join(__dirname, '../static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.xml());

//HOME
app.get('/', (req, res)=> {
    res.render('homepage');
});

//SEARCH
app.get('/search', (req, res)=>{
    res.render('search');
    //getQuery(req.query.query);
});

app.post('/search', (req, res)=>{
    const searchQuery = req.body.searchQuery;
    //console.log(searchQuery);
    res.render('search', {data : { searchQuery : searchQuery }});
    getQuery(searchQuery);
    res.end();
});

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
});

function getQuery(query) {
    //console.log(query);
    console.log( process.env.goodreadskey );
    /*axios.get('').then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    });*/
}