
function checkConcatenatedSum(number,concattime) {
    let num;
    let isNegative = false;
    if(number < 0)
      {
        isNegative = true;
        num = -number;
      } else {num = +number;}
    let array = num.toString().split('').map((currentValue) => currentValue.repeat(concattime));
    let result = array.map(Number).reduce((accum, value) => { 
          return accum + value; 
      })
     if (isNegative) {
        result = -result;
        } else {
          result = +result;
        }
    function checkresult() {
        if (result === number)
        {
          return true;
        } else
        return false;
      }
    
    return checkresult();
  }
  console.log(checkConcatenatedSum(2997,3));
  console.log(checkConcatenatedSum(-76,10));