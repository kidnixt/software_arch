class Pipeline {
    constructor(){
        this.filters = [];
    }

    use(filter){
        this.filters.push(filter);
    }

    process(data){
        let result = data;
        for (let filters of this.filters){
            result = filters(result);
        }
        return result;
    }
}

module.exports = { Pipeline };