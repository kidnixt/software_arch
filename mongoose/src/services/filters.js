function ObjectToStringList(object){
    return Object.keys(object).map(key => object[key].toString());
}

function Trimmer(strings){
    return strings.map(element => element.trim());
}

function Concat(strings){
    return strings.reduce((total, element) => total += " " + element);
}

function UpperCase(string){
    let noSpaces = string.trim();
    noSpaces = noSpaces.at(0).toUpperCase() + noSpaces.substring(1);
    return noSpaces;
}

function DotAtTheEnd(string){
    return string + ".";
}

module.exports = {Trimmer, Concat, UpperCase, DotAtTheEnd, ObjectToStringList}