function findOutlier(integers) {
    let N = 0;
    let odd = [];
    let even = [];
    for (let i = 0; i < integers.length; i++) {
        if (integers[i] % 2 === 0) {
            even.push(integers[i]);
        } else if (integers[i] % 2 !== 0) {
            odd.push(integers[i]);
        }
    }
        if (even.length === 1) {
            N = even[0];
        } else if (odd.length === 1) {
            N = odd[0];
        }
    return N;
}


console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]));