const array = [3,2,0,-4,8,18,7,20,9,66,11,155,-13,9,45,-57,17,32,29,57,21];
let count = 0;

function quickSort(array) {     //recursive search
    if(array.length <= 1) {
        return array;
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array[pivotIndex];
    let less = [];
    let greater = [];
    for (let i = 0; i < array.length; i++) {
        count++;
        if (i === pivotIndex) 
            continue;
            if (array[i] < pivot) {
                less.push(array[i]);
            } else if (array[i] > pivot) {
                greater.push(array[i]);
            }
        
    }
    return [...quickSort(less), pivot, ...quickSort(greater)];
}

console.log(quickSort(array));
console.log("count = " + count);