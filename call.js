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
const res = calc.apply(obj, [120, 3]);
const fun = calc.bind(obj);
const rest = fun(5, 2); 