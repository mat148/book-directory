const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const dotenv = require('dotenv');

const fetch = require('node-fetch');

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

let totalResults = 0;
let resultsEnd = 0;
let numberOfPaginations = 0;

//Search
app.get('/search', async (req, res) => {
    const query = req.query.searchQuery;

    const fetch_response = async (url, query) => {
        try {
            const response = await fetch(url);
            const xml = await response.text();

            xml2js.parseString(xml, (error, result) => {

                var paginations = result.GoodreadsResponse.search[0];
                totalResults = paginations['total-results'];
                resultsEnd = paginations['results-end'];
                numberOfPaginations = totalResults / resultsEnd;

                var test = result.GoodreadsResponse.search[0].results[0].work.map( w => {
                    let bestBook = w.best_book[0];
                    return {
                        title: bestBook.title[0],
                        author: bestBook.author[0].name,
                        image_url: bestBook.image_url[0],
                        small_image: bestBook.small_image_url[0],
                        original_publication_year: w.original_publication_year[0]._,
                    }
                });

                res.render('search', {data : { goodReadsResponse : test, searchQuery : query}});
                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    };

    fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + query + '&page=0', query);
});

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
});