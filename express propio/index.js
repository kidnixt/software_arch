const express = require('express');
const app = express();
const axios = require('axios');

const API_KEY = "qQLawAOdPaVOwL6AxoYGFy8rWXf8GcBJ";

//obtener el clima utilizando accuweather por nombre de ciudad
app.get('/clima/:ciudad', (req, res) => {
    const ciudad = req.params.ciudad;

    //Returns information for an array of cities that match the search text.
    const url = `http://api.weatherapi.com/v1/current.json?key=73701186c7f5440ea42190836231603&q=${ciudad}&aqi=no`;
    axios.get(url)
        .then(response => {
            const data = response.data;
            const name = data.location.name;
            const country = data.location.country;
            const temp = data.current.temp_c;
            const humidity = data.current.humidity;
            const condition = data.current.condition.text;
            const wind = data.current.wind_kph;
            const mensaje = `El clima en ${name} de ${country} es de ${temp}°C, con una humedad de ${humidity}%, con vientos de ${wind}km/h y con condiciones de ${condition}`;
            res.send(mensaje);
        })
        .catch(error => {
            if (error.response) {
                res.status(error.response.status).send(error.response.data.error.message);
            }
        }
    );
})

app.listen(3000, () => {
    console.log('Server on port 3000');
});


