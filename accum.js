export function accum(s) {
	let s = s.toString().split('')

	const iterator = array1.keys();

	for (const key of iterator) {
		console.log(key);
	}

	function addElem(propertyName) {
		// const iterator = [...propertyName].values();
		// for (const key of iterator) {
		// }
		function upperCase(match) {
			return match.toUpperCase() + '-';
		}
		// console.log(match.toLowerCase().repeat(f() => );

		return propertyName.replace(/[A-Za..z].+/g, upperCase);
	}
}
addElem("abcd");

console.log('ZpglnRxqenU'.split('').map((a, i) => a.toUpperCase() + a.toLowerCase().repeat(i)).join('-'));

if (!String.prototype.repeat) {
	String.prototype.repeat = function (n) {
		// повторить строку n раз
		return new Array(n + 1).join(this);
	};
}// your code

console.log("La".repeat(3)); // LaLaLa