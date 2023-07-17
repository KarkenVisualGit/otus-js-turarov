function outer() {
    let message = 'Hello';
    let count = 0;
    return function() {
        console.log(message);
        count++;
        console.log(count);
    }
}

const value = outer();

const message = 'Hi';
value();