
function count(array) {
   
  return array.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});

   };
   let arr = ['james', 'james', 'john']
   const result = arr.reduce((acc, curr) => {
    acc[curr] ??= {[curr]: 0};
    acc[curr][curr]++;
    
    return acc;
  }, {});
  console.log(result);
  console.log(['james', 'james', 'john'].filter(function(value){
    return value === false;
}).length);

a = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
let result1 = { };
for(var i = 0; i < a.length; ++i) {
    if(!result1[a[i]])
        result1[a[i]] = 0;
    ++result1[a[i]];
};
console.log(result1);

const occurrences = ['a', 'a', 'b', 'b', 'b'].reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});
  
  console.log(occurrences);
  console.log(count(['james', 'james', 'john']));

let arr1 = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4]

const map = arr1.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

console.info([...map.keys()])
console.info([...map.values()])
console.info([...map.entries()])

function count(array){
  var names = {};
  array.forEach(item => {
    names[item] = (names[item] || 0) + 1;
  });
  return names;
}
console.log(count(['james', 'james', 'john']));

function count(array){
  let counter = {};
  
  for (let i=0; i<array.length; ++i)
  {
    if (counter[array[i]] == undefined)
      counter[array[i]] = 1;
    else
      counter[array[i]] ++;
  }
  
  return counter;
}
console.log(count(['james', 'james', 'john']));

function count(array){
  return array.reduce(function (stack, value) {
    return stack[value] ? stack[value]++ : stack[value] = 1, stack;
  }, {});
}
console.log(count(['james', 'james', 'john']));