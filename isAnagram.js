let test = prompt('Enter first string');
let original  = prompt('Enter second string');
let test1 = [];
let original1 = [];

var isAnagram = function(test, original) {

    this.test = test.toString().split('').sort(function(a, b) {
        return a - b;
      });
    this.original = original.toString().split('').sort(function(a, b) {
        return a - b;
      });
      
    //   return test.length == original.length && test.every((v,i)=>v === original[i]);
    // (isAnagram("foefet", "toffee")
};
    // isAnagram(test, original);
    test1 = test.split('');
    console.log(test1.sort().join());
    console.log(original.split('').sort().join());
