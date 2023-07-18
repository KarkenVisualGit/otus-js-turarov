const calc = {
    a: 3,
    b: 4,
    sum() {
        console.log(this.a + this.b);
    },
    write(a,b) {
        this.a = a;
        this.b = b;
    }
}


calc.write(5, 6);
calc.sum();
console.log(calc);