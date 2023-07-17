function outer() {
    let message = 'Hello';
    return function() {
        console.log(message);
    }
}

const value = outer();

const message = 'Hi';
value();