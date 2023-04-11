const express = require('express');
const app = express();
const weather = require('./services/weather');

app.listen(3000, () => {
    console.log('Server on port 3000');
});

app.get("/weather", (req, res) => {
    if(!req.query.address){
        res.status(412)
        res.send({error: "You must provide an address"})
        return;
    }
    weather(req.query.address, (error, data) => {
        if(error){
            res.status(500)
            res.send(error)
            return;
        }
        res.send(data)
    })
});