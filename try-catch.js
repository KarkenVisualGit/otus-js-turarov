try {
    const input = prompt ('Enter your name');
    const inputArr = input.split(' ');

    if (inputArr.length !== 2) {
        throw new Error('Invalid input');
    }
} catch(err) {
    alert(err.message)
}
console.log('+');