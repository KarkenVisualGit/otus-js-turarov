const array = [3,2,0,-4,8,18,7,20,9,66,11,155,-13,9,45,-57,17,32,29,57,21];
let count = 0;

function selectSort(array) {
    for (let i = 0; i < array.length; i++){
        let indexMin = i;
        for (let j = i + 1 ; j < array.length; j++) {
            if (array[j] < array[indexMin]) {
                indexMin = j;
            }
            count++;
        }
        let tmp = array[i];
        array[i] = array[indexMin];
        array[indexMin] = tmp;
    }
    return array;
}

console.log(selectSort(array));
console.log(array.length);
console.log("count = " + count);