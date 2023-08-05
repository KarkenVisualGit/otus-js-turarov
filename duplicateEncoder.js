let word = "Supralapsarian";
let result = word.toLowerCase().split('');
result = result.map((element) =>
result.indexOf(element) !== result.lastIndexOf(element)
        ? element = ')' : element = '(').join('');

console.log(result);

