let a = Number(prompt('Enter a coefficient'));
let b = Number(prompt ('Enter b coefficient'));
let c = Number(prompt ('Enter c coefficient'));
let x = 0;
const discr = Math.pow(b, 2) - (4 *a *c);
if (discr < 0) {
    console.log('The equation has no roots');
} else if(discr === 0) {
    let x = (-b) / (2*a);
    console.log ("X = " + x);
} else if(discr > 0) {
    let x1 = ( (-b) + Math.sqrt(discr)) / 2*a;
    let x2 = ( (-b) - Math.sqrt(discr)) / 2*a;
    console.log("X1= " + x1, "X2 = " + x2);
}