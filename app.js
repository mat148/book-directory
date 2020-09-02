const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || "3000";

const goodreadsapi = 'https://www.goodreads.com/search/index.xml';
const goodreadskey = process.env.goodreadskey;

app.use('/public', express.static(path.join(__dirname, '../static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//HOME
app.get('/', (req, res)=> {
    res.render('homepage');
});

//SEARCH
app.get('/search', (req, res)=>{
    res.render('search', {data : { goodReadsResponse : 'text', searchQuery : 'searchQuery' }});
    res.end();
});

app.post('/search', (req, res)=>{
    const searchQuery = req.body.searchQuery;
    const cleanQuery = encodeURI(searchQuery);

    axios.get( goodreadsapi + '?key=' + goodreadskey + '&q=' + cleanQuery ).then(response => {
        xml2js.parseString(response.data, (error, result)=> {
            var test = result.GoodreadsResponse.search[0].results[0].work.map( w => {
                let bestBook = w.best_book[0];
                return {title: bestBook.title[0]}
            });

            res.render('search', {data : { goodReadsResponse : test, searchQuery : searchQuery }});
            res.end();
        });

    }).catch(error => {
        console.log(error);
    });
});

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
});