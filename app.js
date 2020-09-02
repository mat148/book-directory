const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const convert = require('xml-js');
const xml2js = require('xml2js');
//require('body-parser-xml')(bodyParser);
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
    //getQuery(req.query.query);
});

app.post('/search', (req, res)=>{
    const searchQuery = req.body.searchQuery;
    const cleanQuery = encodeURI(searchQuery);
    //const goodReadsXML = getQuery(searchQuery);
    //res.sendFile(goodReadsXML);

    axios.get( goodreadsapi + '?key=' + goodreadskey + '&q=' + cleanQuery ).then(response => {

        /*var result = convert.xml2js(response.data, {compact: false, spaces: 4});
        let temp = result.elements.map( e => {
            return e.elements.filter( f => {
                return f.name == 'Request';
            });
        });
        console.log(temp[0][0].elements);*/

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
    //console.log(getQuery(searchQuery));
    //console.log(searchQuery);
    //console.log(getQuery(searchQuery));
    //console.log(req.body);
});

/*axios.get( goodreadsapi + '?key=' + goodreadskey + '&q=' + cleanQuery ).then(response => {
    //console.log(response.data);
    //Parse XML data?
    //console.log(response.xml());
    return response.data
}).catch(error => {
    console.log(error);
});*/

/*axios.post('/search').then((res) => {
    console.log(res);
});*/

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
});

/*const getQuery = function(query) {
    //console.log(query);
    //console.log( process.env.goodreadskey );
    //https://www.goodreads.com/search/index.xml?key=b0L0YkqXxrPPmyhgKSJhLw&q=Test
    const cleanQuery = encodeURI(query);
    return axios.get( goodreadsapi + '?key=' + goodreadskey + '&q=' + cleanQuery ).then(response => {
        //console.log(response.data);
        //Parse XML data?
        //console.log(response.xml());
        return response.data
    }).catch(error => {
        console.log(error);
    });
}*/