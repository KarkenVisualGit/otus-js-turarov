let test = prompt('Enter first string');
let original  = prompt('Enter second string');
let test1 = [];
let original1 = [];

var isAnagram = function(test, original) {

  console.log(this.test = test.toString().toLowerCase().split('').sort());
  console.log(this.original = original.toString().toLowerCase().split('').sort());
    
  return this.test.length == this.original.length && this.test.every((v,i)=>v === this.original[i]);
    // (isAnagram("foefet", "toffee")
    //isAnagram("Buckethead", "DeathCubeK"
    //isAnagram("Twoo", "WooT"
    //isAnagram("dumble", "bumble"
    //isAnagram("ound", "round"
    //isAnagram("apple", "pale"

};
    console.log(isAnagram(test, original));
    // test1 = test.toString().split('');
    // console.log(test1.sort().join());
    // console.log(original.toString().split('').sort().join());
