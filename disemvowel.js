const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
const str = "This website is for losers LOL!";

function disemvowel(str) {

    let str1 = str.split('');
    str = str1.filter(element => !vowels.includes(element)).join('');
    return str;
  }

  console.log(disemvowel(str));