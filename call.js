const person = {
    name : 'John',
    greet () {
        console.log(`I'm ${this.name}`);
    }
}
const user = {name: 'Sam'}
person.greet.call(user);

const obj = {num : 45}
function calc (a, b) {
    return (a + this.num) * b;
}

    function diff(a, b) {
    return a > b ? (a - b) : (b - a);
    }

console.log(diff(-5, 19));

function isWord (str) {
    if (str.search(' ') != -1) {
        return true;
    } else {
        return false;
      }
}
function isWord1 (str) {
    if (str.includes(' ')) {
        return true;
    } else {
        return false;
    }
}

const str = isWord("Abay's Way");
const str1 = isWord1("Abay's Way");
console.log(str);
console.log(str1);

function pow (a, x) {
    let res = 1;
    if (x < 0) {
        x = -x;
        for (let i = 1; i <= x; i++) {
            res /= a;
        }
    } else if (x > 0) {
        for (let i = 1; i <= x; i++) {
            res = res*a;
        }
    } else {
        res = 1;
    }
    return res;
}
const result = pow (2, 10);
console.log(result);

const res = calc.apply(obj, [120, 3]);
console.log(res);
const fun = calc.bind(obj);
console.log(fun);
const rest = fun(5, 2);
console.log(rest); 