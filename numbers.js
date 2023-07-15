let array = [];
let sum = 0;
let num = prompt('Enter a number');
let x = prompt('Enter an area of square');
let y = prompt('Enter an area of circle');
for (let i = 1; i <= +num; i++) {
    if(i%2 !== 0) {
        sum+=i;
        array.push(i);
    }
}
let dsquare = Math.sqrt(+x);
let dcircle = Math.sqrt(1.27*(+y));
function foo(x,y) {
    return ( dsquare < dcircle ? true:false);
}

console.log(array);
console.log(sum);
console.log("Average " + (sum/array.length));

console.log(dsquare);
console.log(dcircle);
console.log(foo());
