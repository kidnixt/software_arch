const Queue = require('bull');
const myQueue = new Queue('myQueue');




myQueue.process(async (job, done) => {
    const redis = require('redis');
    const client = redis.createClient();
    console.log("processing job...")

    await client.connect();
    await client.set('data', JSON.stringify(job.data));

    console.log("data added to redis!!!")
});

module.exports = myQueue;