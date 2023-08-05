function zipWith(fn, a0, a1) {
    let result = [];
    let a =  (a0.length < a1.length) ? a0.length : a1.length;
    if (a0.length === a1.length) {
        for (let i = 0; i < a0.length; i++) {
            result.push(fn(a0[i], a1[i]));
        }
    } else {
        for (let i = 0; i  < a; i++) {
            result.push(fn(a0[i], a1[i]));
        }
    }
    return result;
}
const plus = (a,b) => a+b ;
console.log(zipWith((a,b) => a+b, [0,1,2,3], [0,1,2,3] ));