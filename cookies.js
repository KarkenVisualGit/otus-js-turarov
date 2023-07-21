let name = 'user name';
let value = 'John Smith';

document.cookie = 'token=Qweweasdasf65431sda; max-age=10';
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
document.cookie = 'user = John; max-age=3600';

console.log(document.cookie);



