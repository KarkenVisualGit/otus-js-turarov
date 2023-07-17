const request = new Promise ((resolve, reject) => {
    console.log('request');

    setTimeout(() => {
        console.log('response');
        // resolve();
        reject();
    }, 2000);
});


request.then(() => {
    console.log('resolved');
},
() => {
    console.log('rejected');
});