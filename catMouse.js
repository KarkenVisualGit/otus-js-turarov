function catMouse(map,moves){
    //coding and coding...
  let C = map.split('').indexOf('C');
  let m = map.split('').indexOf('m');
  let X1 = C < 10 ? C : C%10;
  let Y1 =  C < 10 ? 0 : ((C - C%10) / 10);
  let X2 =  m < 10 ? m : m%10;
  let Y2 =  m < 10 ? 0 : ((m - m%10) / 10);
  let coord = Math.abs(X1 - X2) + Math.abs(Y1 - Y2);
  console.log(map.split(''));
  console.log(map.split('').indexOf('m'));
  console.log(map.split('').indexOf('C'));
  console.log(coord);
  console.log(C);
  console.log(m);
  console.log(X1);
  console.log(X2);
  console.log(Y1);
  console.log(Y2);
  console.log(X1 - X2);
  console.log(Y1 - Y2);
  console.log(Math.abs(X1 - X2));
  console.log(Math.abs(Y1 - Y2));
  if ( C === -1 || m === -1) {
    return "boring without two animals";
  } else if(C !== -1 && m !== -1 && moves >= coord) {
    return 'Caught!';
  }
    else if(C !== -1 && m !== -1 && moves < coord) {
      return 'Escaped!';
    } 
  }
  let map = `C........\n
  .........\n
  .......m.`;
  console.log(catMouse(map,5));

  function catMouse(map,moves){
    //coding and coding...
  let C = map.split('').indexOf('C');
  let m = map.split('').indexOf('m');
  let X1 = C < 10 ? C : C%10;
  let Y1 =  C < 10 ? 0 : ((C - C%10) / 10);
  let X2 =  m < 10 ? m : m%10;
  let Y2 =  m < 10 ? 0 : ((m - m%10) / 10);
  let coord = Math.abs(X1 - X2) + Math.abs(Y1 - Y2);
  if ( C === -1 || m === -1) {
    console.log("boring without two animals");
  } else if(moves >= coord) {
    return 'Caught!';
  }
    else if(moves < coord) {
      return 'Escaped!';
    } 
  }