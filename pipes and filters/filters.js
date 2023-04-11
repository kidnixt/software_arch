const IVA = 0.22;
const fiftyK = 100000;
const hundredK = 100000;

function addition (prices) {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    return sum;
}

function withoutIVA (total) {
    return total - total * IVA;
}

function taxes (total) {
    if (total < fiftyK) {
        return total - total * 0.20;
    }else if (fiftyK < total < hundredK) {
        return total - total * 0.25}
    else {
        return total - total * 0.30;
    }
}


module.exports = { addition, withoutIVA, taxes };