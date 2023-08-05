let s = '';
function accum(string) {

	return string.toString().split('')
		.map((a, i) => a.toUpperCase() + a.toLowerCase().repeat(i))
		.join('-');

}
console.log(accum("ZpglnRxqenU"));
console.log(accum("HbideVbxncC"));
console.log(typeof (accum));
console.log(accum instanceof Function);

// 	function addElem(propertyName) {
// 		// const iterator = [...propertyName].values();
// 		// for (const key of iterator) {
// 		// }
// 		function upperCase(match) {
// 			return match.toUpperCase() + '-';
// 		}
// 		// console.log(match.toLowerCase().repeat(f() => );

// 		return propertyName.replace(/[A-Za..z].+/g, upperCase);
// 	}
// 	addElem("abcd");
// }

// console.log('ZpglnRxqenU'.split('').map((a, i) => a.toUpperCase() + a.toLowerCase().repeat(i)).join('-'));

