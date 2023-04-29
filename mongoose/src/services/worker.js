const { Pipeline } = require("./pipeline");
const {Trimmer, Concat, UpperCase, DotAtTheEnd, ObjectToStringList} = require("./filters");

const producer = async (data) => {
    const pipeline = new Pipeline();
    pipeline.use(ObjectToStringList);
    pipeline.use(Trimmer);
    pipeline.use(Concat);
    pipeline.use(UpperCase);
    pipeline.use(DotAtTheEnd);
    return pipeline.run(data);
}

module.exports = { producer };