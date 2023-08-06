const array = [3,2,0,-4,8,18,7,20,9,66,11,155,-13,9,45,-57,17,32,29,57,21];
let count = 0;
function linearSearch(array, item) {
  for (let i =0; i < array.length; i++ ) {
    count += 1;
    if (array[i] === item) {
        return i;
    }
  } 
}

console.log(linearSearch(array, 21));
console.log("count = " + count);