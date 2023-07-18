let a = {
    name:'otus'
}

a.__proto__ = {age: 23};

const userPrototype = {
    greet () {
        alert (`Hello from ${this.name}`);
    }
}

// User.prototype = {
//     greet: function() {
//         console.log(this.)
//     }
// }

function getUserWithPrototype() {
    return {

    }
}