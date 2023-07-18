function outer() {
    let message = 'Hello';
    let count = 0;
    return function() {
        console.log(message);
        count++;
        console.log(count);
    }
}
const id = setTimeout(() => {
    
}, 1000);
clearTimeout (id);

function logger() {
    console.log('now');
}
setTimeout(logger, 1000);

function sum(a,b) {
    return a+b;
}
setTimeout (sum, 1000, 5, 2);
// setInterval(() => {
//     console.log('now');
// }, 1000);

function counter (from,to) {
    let number = from;
    const id = setInterval(() => {
        console.log(number);
        if (number == to) {
            clearInterval(id);
        } else {
            number++;
        }
    }, 1000);
}
counter(4, 8);

const request = (cb) => {
    console.log('request');
    cb({text: 'Error'});

    setTimeout(() => {
        console.log('response');
        const data = {text:'Hello'};
        cb(null, data);
    }, 2000);
}

// const handler = (data) => {
//     console.log('handler', data);
// }

// request (handler);
request ((err, data) => {
    if (!err) {
        console.log('Hello callback!', data);
    } else {
        console.error(err);
    } 
});

const value = outer();

const message = 'Hi';
value();