const str = prompt ('enter string');

const regexp = /[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}/;
const regexp1 = /[a-zA-Z_\.0-9]+@[a-z0-9]+\.[a-z]{2,5}/;
const regexp2 = /[8|\+7]{1}[0-9]{3}[0-9]{7}/;
const regexp3 = /[8|+7]{1}[0-9]{3}[0-9]{7}/;

if (regexp.test(str)) {
    console.log('valid data');
} else if (regexp1.test(str)) {
    console.log('valid email');
} else if(regexp2.test(str) || regexp3.test(str)) {
    console.log('valid phone number');
} else {
    alert('Invalid data');
}

