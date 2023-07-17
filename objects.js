let user = {
    name: 'John'
};

let admin = new Object();

let input = prompt('Enter user age');
user['age'] = +input;

Object.assign(admin, user,{role:'admin'});
let {name, age, role} = admin;

console.log(user);
console.log(admin['name'] + " " + admin['age'] + " " + admin['role']);
console.log(name + " " + age + " " + role);