let date = new Date();
let day = new Date(Date.now());
console.log(day);

const hours = date.getHours();
const mins= date.getMinutes();
const sec= date.getSeconds();

const secPass = (hours*3600) + (mins*60) + sec;
const secInDay = 24*60*60;

console.log(secInDay - secPass);

function formatDate(date) {
    let day = makeTwoDigit(date.getDate());
    let month = makeTwoDigit(date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = makeTwoDigit(date.getHours());
    let minutes = makeTwoDigit(date.getMinutes());

    return `${day}.${month}.${year}.${hours}:${minutes}`;
}

function makeTwoDigit(value) {
    let newValue = value;
    if (value < 10) {
        newValue = '0' + value;
    }
    return newValue;
}

const date1 = new Date('2007-06-05T05:15:44');
console.log(formatDate(date1));
