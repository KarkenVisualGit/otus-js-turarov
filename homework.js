try {
let a = prompt('Enter a side of triangle');
let b = prompt ('Enter b side of triangle');
let c = prompt ('Enter c side of triangle');

    if ( Math.pow(a, 2) + Math.pow(b, 2)  !== Math.pow(c, 2)) {
        throw new Error('Triangle is not rectangular');
        
    } 
    else {
        console.log("Triangle is rectangle");``
    }
}   catch (err) {
        alert(err.message);
    }
