const person = {
    name:'John Smith',
    sayHi() {
        console.log (`Hi ${this.name}`);
    },
    changeName (str) {
        this.name = str;
    },
    sayName: () => {
        console.log(this.name);
    }
}

person.sayHi();
person.changeName('Sam');
console.log(person.name);
person.sayName();