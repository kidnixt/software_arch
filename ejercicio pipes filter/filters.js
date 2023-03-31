const IVA = 0.22;
const fiftyK = 100000;
const hundredK = 100000;

function sumar (precios) {
    let suma = 0;
    for (let i = 0; i < precios.length; i++) {
        suma += precios[i];
    }
    return suma;
}

function sinIva (suma) {
    return suma - suma * IVA;
}

function impuesto (suma) {
    if (suma < fiftyK) {
        return suma - suma * 0.20;
    }else if (fiftyK < suma < hundredK) {
        return suma - suma * 0.25}
    else {
        return suma - suma * 0.30;
    }
}


module.exports = { sumar, sinIva, impuesto };