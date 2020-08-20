const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const app = express();
const port = process.env.PORT || "3000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.xml());

//HOME
app.get('/', (req, res)=> {
    res.send("Hello World");
});

//SEARCH
app.get('/search', (req, res)=>{
    res.send("Search");
    getQuery(req.query.query);
});

app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
});

function getQuery(query) {
    console.log(query);
    /*axios.get('').then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    });*/
}