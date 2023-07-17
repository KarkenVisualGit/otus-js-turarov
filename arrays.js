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

const map = nums.map (x =>
    {
        let max = 0;
        let min = 0;
        x > x[i+1] ? (max = x) : (min = x[i+1]);
    }
)

for (let i = 0; i < nums.length; i++) {
    
}

nums.splice
console.log(map);