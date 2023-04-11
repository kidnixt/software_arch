const express = require('express');
const app = express();
const port = 3001;  

const { Pipeline } = require('./pipeline');
const { addition, withoutIVA, taxes } = require('./filters');

app.get("/autos/ventas/:precios", (req, res) => {
    const prices = req.params.precios;
    const pricesArr = prices.split(",").map(Number);


    var pipe = new Pipeline();
    pipe.use(addition);
    pipe.use(withoutIVA);
    pipe.use(taxes);

    const result = pipe.process(pricesArr);
    res.send(`El total de ganancias de las ventas es ${result}, sin IVA y con impuestos aplicados`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
