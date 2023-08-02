
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