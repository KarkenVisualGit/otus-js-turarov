export function accum(s) {
	if (!String.prototype.repeat) {       
        String.prototype.repeat = function(n) {
          // повторить строку n раз
          return new Array(n + 1).join(this);
        };
      }// your code
}

console.log( "La".repeat(3) ); // LaLaLa