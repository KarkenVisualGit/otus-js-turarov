function calc(x) {
    const map = Array.prototype.map;
    let charCodes = map.call(x, (a) => a.charCodeAt(0));
    

    let total1 = charCodes.reduce((a, b) => {
        return String(a) + String(b);
    }
    )
    let total2 = total1.toString().replace(/(7)/g, '1');

    total1 = total1.toString().split('').map(string => parseInt(string));
    total2 = total2.split('').map(string => parseInt(string));

    return total1.reduce((a, b) => {return a + b; }) - total2.reduce((a, b) => {return a + b; });
}
console.log(calc('abcdef'));
console.log(calc('ABC'));
console.log(calc('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
console.log(calc('jfmgklf8hglbe'));
console.log(calc('aaaaaddddr'));