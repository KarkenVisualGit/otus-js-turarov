let date = new Date();
let day = new Date(Date.now());
console.log(day);

const hours = date.getHours();
const mins= date.getMinutes();
const sec= date.getSeconds();

const secPass = (hours*3600) + (mins*60) + sec;
let minPass = mins*60;
const secInDay = 24*60*60;
const minInDay = 24*60;

console.log(secInDay - secPass);
console.log(minPass);

const input = prompt('DD.MM.YYYY');
const [days, month, year] = input.split('.');

const inputDate = new Date(`${year}-${month}-${days}`);

function getWeekDay(date) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  
    return days[date.getDay()];
  }

let diff = Date.now() - inputDate;
diff = diff / 1000 / 60 / 60;
console.log(diff.toFixed(0));

console.log(getWeekDay(inputDate));

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
let persondate1 = prompt('DD.MM.YYYY');
let persondate2 = prompt('DD.MM.YYYY');
const personDate1 = new Date(persondate1);
const personDate2 = new Date(persondate2);

const person1 = {
    date: personDate1,
    name: 'John'
};
const person2 = {
    date: personDate2,
    name: 'Sam'
}
let diffDate = personDate1 - personDate2;
diffDate = diffDate / 1000 / 60 / 60;
function older() {
    return diffDate < 0 ? person1.name : person2.name;
}

console.log( older() + " is older " + diff.toFixed(0) );

const date1 = new Date('2007-06-05T05:15:44');
console.log(formatDate(date1));
