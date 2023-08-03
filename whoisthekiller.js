// let suspectInfo = {
//     'James': ['Jacob', 'Bill', 'Lucas'],
//     'Johnny': ['David', 'Kyle', 'Lucas'],
//     'Peter': ['Lucy', 'Kyle']
// };
// let dead = ['Lucas', 'Bill']
// const victims = [];
// for (let key in suspectInfo) {
//     if (suspectInfo.hasOwnProperty(key)) {
//         victims.push(suspectInfo[key])
//     }
// }
// let suspect = Object.keys(suspectInfo);
// let k = 0;
// for (var i = 0; i < victims.length; i++) {

//     for (var j = 0; j < dead.length; j++) {

//         if (victims[i][0].includes(dead[j])) { k++ }

//     };

// };

// for (let i of victims) {
//     for (let j of i) {
//       if (victims[j] === dead[i])
//         {
//           result = i;
//         }
//     }
//   }

// alert(k);

function killer(obj, arr) {
    for (const key in obj) {
        let same = 0;
        for (let i = 0; i < arr.length; i++) {
            if (obj[key].includes(arr[i])) {
                same++
            }
            if (same === arr.length) {
                return key
            }
        }
    }
}

function killer(suspectInfo, dead) {
    let suspects = Object.keys(suspectInfo)
    for (suspect of suspects) {
        if (dead.every(person => suspectInfo[suspect].includes(person))) {
            return suspect;
        }
    }
}
console.log(killer({ 'Brad': [], 'Megan': ['Ben', 'Kevin'], 'Finn': [] }, ['Ben']));