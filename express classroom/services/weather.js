const axios = require('axios');
const API_KEY = "1544d5bc2c574f22876170156232503"  ;


const weather = (address, callback) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${address}&aqi=no`;
    axios.get(url)
        .then(response => {
            if(response.data.error){
                callback("Unable to retrieve weather data", undefined)
                return;
            }
            callback(undefined, response.data);
        })
}

module.exports = weather;