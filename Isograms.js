
str.toLowerCase().split('');

function hasDuplicates(arr) {
    return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
}

if (hasDuplicates(str)) {
    return true;
}
else {
    return false;
}

function isIsogram(str){
    if (str.toLowerCase().split('').some(x => str.indexOf(x) !== str.lastIndexOf(x))) {
        return true;
      } else {
        return false;
        }//...
  }