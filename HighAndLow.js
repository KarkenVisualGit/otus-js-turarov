let numbers = "1 2 -3 4 5";
numbers = numbers.split(' ').map(string => parseInt(string)).sort(function (a, b) {
	return a - b;
}).reverse();
console.log(numbers.map(string => parseInt(string)));
function highAndLow(numbers) {
	numbers = numbers.toString().split('').sort(function (a, b) {
		return a - b;
	}).reverse().join('');

	console.log(numbers.toString().split('').sort(function (a, b) {
		return a - b;
	}).reverse());
	return numbers[0] + " " + numbers[numbers.length - 1];
}

function highAndLow(numbers) {
	// numbers = [...numbers];
	numbers = numbers.split('');
	numbers.filter(element => !' '.includes(element)).join('');
	return numbers = numbers.split('').sort(function (a, b) {
		return a - b;
	}).reverse();
	// return numbers[0] + " " + numbers[numbers.length - 1];
}



highAndLow("1 9 3 4 -5");
numbers.sort(function (a, b) {
	return a - b;
});

if (!String.prototype.repeat) {
	String.prototype.repeat = function (n) {
		// повторить строку n раз
		return new Array(n + 1).join(this);
	};
}// your code

console.log("La".repeat(3)); // LaLaLa