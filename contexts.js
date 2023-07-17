const person = {
    name:'John Smith',
    sayHi() {
        console.log (`Hi ${this.name}`);
    }
}

person.sayHi();