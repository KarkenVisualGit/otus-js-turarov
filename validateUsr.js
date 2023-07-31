function validateUsr(username) {
    res =  /^[a-z0-9_]{4,16}$/g.test(username) 
    return res;
  }

  console.log(validateUsr('asddsa'));
  console.log(validateUsr('a'));
  console.log(validateUsr('Hass'));
  console.log(validateUsr('Hasd_12assssssasasasasasaasasasasas'));
  console.log(validateUsr(''));
  console.log(validateUsr('____'));
  console.log(validateUsr('012'));
  console.log(validateUsr('p1pp1'));
  console.log(validateUsr('asd43 34'));
  console.log(validateUsr('asd43_34'));
