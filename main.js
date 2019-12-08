function calculate(inputValue) {
	const expression = /\+|\-|\*|\//;
	const numbers = inputValue.split(expression);

	const numberA = parseInt(numbers[0]);
	const numberB = parseInt(numbers[1]);

	const operation = inputValue.match(expression);

	if (Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null || numberB === 0) {
		updateResult("Operation not recognised");
		return;
	}

	const calculator = new Calculator();
	calculator.add(numberA);

	let result;

	switch(operation[0]) {
		case "+":
			result = calculator.add(numberB);
			break;
		case "-":
			result = calculator.subtract(numberB);
			break;
		case "*":
			result = calculator.multiply(numberB);
			break;
		case "/":
			result = calculator.divide(numberB);
			//numberB !== 0 ? result = calculator.divide(numberB) : result = "Operation not recognised";
			break;
	}

	updateResult(result);
};

function updateResult(result) {
	const element = document.getElementById("result");

	if (element) {
		element.innerText = result;
	}
};

function showVersion(){
	const calculator = new Calculator();
	const element = document.getElementById("version");

	calculator.version
		.then(function(version) {
			element.innerText = version;
		})
};