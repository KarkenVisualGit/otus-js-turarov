function capital(capitals){
    return capitals.map(c => `The capital of ${c.state||c.country} is ${c.capital}`);
    }
let state_capitals = [{state: 'Maine', capital: 'Augusta'}];
let country_capitals = [{'country' : 'Spain', 'capital' : 'Madrid'}];
let mixed_capitals = [{"state" : 'Maine', capital: 'Augusta'}, {country: 'Spain', "capital" : "Madrid"}];
console.log(capital(state_capitals));
console.log(capital(country_capitals));
console.log(capital(mixed_capitals)[1]);