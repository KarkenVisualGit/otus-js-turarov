const email = prompt ('enter email');
const regexp = /[a-zA-Z_\.0-9]+@[a-z0-9]+\.[a-z]{2,5}/;

if (regexp.test(email)) {
    console.log('valid email');
} else {
    alert('Invalid email');
}
