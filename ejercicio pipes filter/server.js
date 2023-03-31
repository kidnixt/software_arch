const express = require('express');
const app = express();
const port = 3001;  

const { Pipeline } = require('./pipeline');
const { sumar, sinIva, impuesto } = require('./filters');

//test app
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
})

app.get("/autos/ventas/:precios", (req, res) => {
    const precios = req.params.precios;
    const preciosArray = precios.split(",").map(Number);


    var pipe = new Pipeline();
    pipe.use(sumar);
    pipe.use(sinIva);
    pipe.use(impuesto);

    const result = pipe.process(preciosArray);
    res.send(`El total de ganancias de las ventas es ${result}, sin IVA y con impuestos aplicados`);
})


app.get("/autos", (req, res) => {
    res.send("No se ingresaron ventas");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
