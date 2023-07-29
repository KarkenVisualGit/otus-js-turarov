// try {
//     const input = prompt ('Enter your name');
//     const inputArr = input.split(' ');

//     if (inputArr.length !== 2) {
//         throw new Error('Invalid input');
//     }
// } catch(err) {
//     console.log(err.message)
// }
function factorial(n) {
    try {
        let result = 1;
        if (n < 0 || n > 12) {
            throw new RangeError('Invalid input');
        }
        while (n) {
            result *= n--;
        }
        return result;
    } catch (e) {
        console.log(e.message);
    }
}
console.log(factorial(13)); 