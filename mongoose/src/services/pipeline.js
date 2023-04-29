class Pipeline {
    constructor() {
      this.filters = [];
    }
    use(filter) {
      this.filters.push(filter);
    }
    run(input) {
      const result = this.filters.reduce(function (total, function_item) {
        return function_item(total);
      }, input);
  
      return result;
    }
  }
  
  module.exports = { Pipeline };