const array = [3,2,0,-4,8,18,7,20,9,66,11,155,-13,9,45,-57,17,32,29,57,21];
let count = 0;

function bubbleSort(array) {
    for (let i = 0; i < array.length; i++){
        for (let j = 0 ; j < array.length; j++) {
            if (array[j + 1] < array[j]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            count++;
        }
    
    }
    return array;
}


console.log(bubbleSort(array));
console.log("count = " + count);