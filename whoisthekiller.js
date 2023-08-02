let suspectInfo = {
    'James': ['Jacob', 'Bill', 'Lucas'],
    'Johnny': ['David', 'Kyle', 'Lucas'],
    'Peter': ['Lucy', 'Kyle']
};
let dead = ['Lucas', 'Bill']
const victims = [];
for (let key in suspectInfo) {
    if (suspectInfo.hasOwnProperty(key)) {
        victims.push(suspectInfo[key])
    }
}
let k = 0;
for (var i = 0; i < victims.length; i++) {

    for (var j = 0; j < dead.length; j++) {

        if (victims[i][0].includes(dead[j])) { k++ }

    };

};

for (let i of victims) {
    for (let j of i) {
      if (victims[j] === dead[i])
        {
          result = i;
        }
    }
  }

alert(k);