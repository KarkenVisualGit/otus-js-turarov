const nums = [];
let sum = 0;
for (let i = 0; i < 10; i++)
{
    let num = prompt('Enter a value of array');
    let n = Number(num);
    nums.push(n);
}
console.log(nums);
const newnums = nums.forEach(element => 
    {
        sum+=element;
    }
)
console.log(sum);
const array = nums.map(x => x * 2);
console.log(array);
const array1 = nums.map(x => x);
const array2 = nums.map(x => x);

const max = array1.reduce((a,b) =>
    {
        return a > b ? a : b;
    }, 0 
)
console.log(max);

const min = array2.reduce((a,b) => 
    { 
        return a > b ? b : a; 
    } , 0
)
console.log(min);
