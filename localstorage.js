// localStorage.clear();
// console.log(localStorage);
const jsonObj = localStorage.getItem('user');

if (jsonObj) {
    const obj = JSON.parse(jsonObj);
    alert(`Hello ${obj.name}`);
} else {
    const input = prompt('Enter your name');
    const obj = {
        name: input
    }
    
    const jsonObj = JSON.stringify(obj);
    localStorage.setItem('user', jsonObj);
}


// let newObj = JSON.parse(jsonObj);