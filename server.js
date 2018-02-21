const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

// expedia api url 
const API = 'https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel';

// initializing express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'build')));

// creating a post route to retrieve filtered hotels 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// creating a post route to retrieve filtered hotels 
app.post('/api/hotels', (req, res) => {
    // assigning request params to a variable or leave it empty if there is none
    const params = req.body || {};

    // calling expedia api with all params 
    axios.get(API,{params})
    .then(function (response) {
        // sending back the response data 
        res.send(response.data);
    })
    .catch(function (error) {
        // catching any error that could occur and sending it back with a status of 500
        res.status(500).send('Calling Expedia Api Faild because: ' + error);
    });
});

// setting a port for the server to listen to
const port = 5000;

// initializing server listener on the port defined 
app.listen(port, () => `Server running on port ${port}`);