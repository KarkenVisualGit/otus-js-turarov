function findOdd(A) {
    let odd = 0;
    let stack = {};
    for (let i = 0; i < A.length; i++) {
        if (stack[A[i]] === undefined)
            stack[A[i]] = 1;
        else
            stack[A[i]]++;
    }
    for (let count in stack) {
        if (stack[count] % 2 !== 0) {
            odd = Number(count);
        }
    }
    return odd;
}
console.log(findOdd([]));