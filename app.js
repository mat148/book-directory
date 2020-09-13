const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Joi = require('joi');

dotenv.config();
const app = express();
const port = process.env.PORT || "3000";

const goodreadsapi = 'https://www.goodreads.com/search/index.xml';
const goodreadskey = process.env.goodreadskey;

app.use('/public', express.static(path.join(__dirname, '../static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Home
app.get('/', (req, res)=> {
    res.render('homepage');
});

app.get('/search', async (req, res) => {
    const query = req.query.searchQuery;
    const currentPage = 1;
    console.log('get', query);
    
    const fetch_response = async (url) => {
        try {
            const response = await fetch(url);
            const xml = await response.text();

            xml2js.parseString(xml, (error, result) => {

                var paginations = result.GoodreadsResponse.search[0];
                totalResults = parseInt(paginations['total-results']);
                resultsEnd = parseInt(paginations['results-end']);

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

                //console.log(test[0].title);

                res.render('search', {data : {
                    goodReadsResponse : test,
                    searchQuery : query,
                    totalResults : totalResults,
                    resultsEnd : resultsEnd,
                    currentPage : currentPage
                }});
                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    };

    fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + query + '&page=' + currentPage);
});

//Search
app.post('/search', async (req, res) => {
    console.log('post');
    const test = req.body.test;
    
    //console.log(test[0]);
    res.render('search');
    /*const page = 1;
    const query = req;

    //console.log(query);

    const fetch_response = async (url, query) => {
        try {

        } catch(err) {
            console.error(err);
        }
    };

    fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + query + '&page=' + page, query);*/




    /*if(g_searchQuery == req.query.searchQuery) {
        console.log('Page Reload');
        g_searchQuery = req.query.searchQuery;

        const fetch_response = async (url, query) => {
            try {
                const response = await fetch(url);
                const xml = await response.text();

                xml2js.parseString(xml, (error, result) => {

                    var paginations = result.GoodreadsResponse.search[0];
                    totalResults = parseInt(paginations['total-results']);
                    resultsEnd = parseInt(paginations['results-end']);

                    g_resultsEnd = resultsEnd;

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

                    res.render('search', {data : {
                        goodReadsResponse : test, 
                        searchQuery : query, 
                        totalResults : totalResults,
                        resultsEnd : g_resultsEnd,
                        currentPage : g_currentPage
                    }});
                    res.end();
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + g_searchQuery + '&page=' + g_currentPage, g_searchQuery);
    } else {
        console.log('Page New');
        g_currentPage = 1;

        g_searchQuery = req.query.searchQuery;

        const fetch_response = async (url, query) => {
            try {
                const response = await fetch(url);
                const xml = await response.text();

                xml2js.parseString(xml, (error, result) => {

                    var paginations = result.GoodreadsResponse.search[0];
                    totalResults = parseInt(paginations['total-results']);
                    resultsEnd = parseInt(paginations['results-end']);

                    g_resultsEnd = resultsEnd;

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

                    res.render('search', {data : {
                        goodReadsResponse : test, 
                        searchQuery : query, 
                        totalResults : totalResults,
                        resultsEnd : g_resultsEnd,
                        currentPage : g_currentPage
                    }});
                    res.end();
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + g_searchQuery + '&page=' + g_currentPage, g_searchQuery);
    }*/
    //res.render('search');
});

//SEARCH POST
/*app.post('/search', (req, res) => {
    console.log(req);
    if(g_searchQuery == req.body.searchQuery) {
        console.log('New page');
        g_searchQuery = req.body.searchQuery;
    } else {
        console.log('Reload');
    }

    const fetch_response = async (url, query) => {
        try {
            const response = await fetch(url);
            const xml = await response.text();

            xml2js.parseString(xml, (error, result) => {

                var paginations = result.GoodreadsResponse.search[0];
                totalResults = parseInt(paginations['total-results']);
                resultsEnd = parseInt(paginations['results-end']);

                g_resultsEnd = resultsEnd;

                var g_books = result.GoodreadsResponse.search[0].results[0].work.map( w => {
                    let bestBook = w.best_book[0];
                    return {
                        title: bestBook.title[0],
                        author: bestBook.author[0].name,
                        image_url: bestBook.image_url[0],
                        small_image: bestBook.small_image_url[0],
                        original_publication_year: w.original_publication_year[0]._,
                    }
                });

                //console.log(g_books);

                res.render('search', {data : {
                    goodReadsResponse : g_books,
                    searchQuery : query, 
                    totalResults : totalResults,
                    resultsEnd : g_resultsEnd,
                    currentPage : g_currentPage
                }});
                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    };

    fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + g_searchQuery + '&page=' + g_currentPage, g_searchQuery);
});*/

//Load More Books
/*app.post('/loadmorebooks', async (req, res) => {
    //console.log(req.body.currentPage, g_currentPage);
    currentPageIncrement = g_currentPage + 1;
    console.log(currentPageIncrement);

    g_currentPage = currentPageIncrement;

    const fetch_response = async (url, query) => {
        try {
            const response = await fetch(url);
            const xml = await response.text();

            xml2js.parseString(xml, (error, result) => {

                var paginations = result.GoodreadsResponse.search[0];
                totalResults = parseInt(paginations['total-results']);
                resultsEnd = parseInt(paginations['results-end']);

                g_resultsEnd = resultsEnd;

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

                res.json({
                    data : {
                        goodReadsResponse : test
                    }
                });

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    };

    fetch_response(goodreadsapi + '?key=' + goodreadskey + '&q=' + g_searchQuery + '&page=' + currentPageIncrement, g_searchQuery);
});*/

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
});