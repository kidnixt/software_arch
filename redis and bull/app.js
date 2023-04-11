const express = require('express');
const app = express();
const port = 3000;

const redis = require('redis');
const client = redis.createClient();
const myQueue = require('./queue');

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.log('Something went wrong ' + err);
});

app.get('/redis', async (req, res) => {
    await client.connect();
    try {
        const dataToSend = await client.get('data');
        if (dataToSend) {
            res.send(dataToSend);
            console.log('data loaded from redis');
        } else {
            const dataFromDB = require('./bd/data.json');
            console.log("sending data from db...")
            res.send(dataFromDB);
            console.log("adding data to redis...")

            await myQueue.add((dataFromDB), { delay: 5000 });
        }

    } catch (error) {
        console.log(error);
    }finally{
        client.quit();
    }
});

app.use(express.json());
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
}); 