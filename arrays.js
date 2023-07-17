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

const max = nums.reduce ( (a,b) => a > b ? a : b)
console.log(max);

const min = nums.reduce ( (a,b) => a < b ? a : b)
console.log(min);
// let max = 0;
// let min = 0;
// for (let i = 0; i < nums.length; i++) {
//     for (let j = i; j < nums.length; j++) {
//         if (nums[i] > nums[j]) {
//             max = nums[i]; min = nums[j];
//         }
//         else {max = nums[j]; min = nums[i];}
//     }   
// }
// console.log("Max = " + max);
// console.log("Min = " + min);