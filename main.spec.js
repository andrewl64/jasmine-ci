describe("main.js", function() {
	describe("calculate()", function() {
		it("validates expression when the first number is invalid", function() {
			spyOn(window, "updateResult").and.stub();

			calculate("a+3");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith("Operation not recognised");
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});
		it("validates expression when the second number is invalid", function() {
			spyOn(window, "updateResult");

			calculate("3+a");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith("Operation not recognised");
			expect(window.updateResult).toHaveBeenCalledTimes(1);		
		});
		it("validates expression when operation is invalid", function() {
			spyOn(window, "updateResult");

			calculate("3_4");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith("Operation not recognised");
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});
		it("calls add", function() {
			const spy = spyOn(Calculator.prototype, "add");

			calculate("3+4");

			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy).toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(4);

		});
		it("calls subtract", function() {
			spyOn(Calculator.prototype, "subtract");

			calculate("3-4");

			expect(Calculator.prototype.subtract).toHaveBeenCalled();
			expect(Calculator.prototype.subtract).toHaveBeenCalledWith(4);

		});
		it("calls multiply", function() {
			spyOn(Calculator.prototype, "multiply");

			calculate("3*4");

			expect(Calculator.prototype.multiply).toHaveBeenCalled();
			expect(Calculator.prototype.multiply).toHaveBeenCalledWith(4);
		});
		it("calls divide", function() {
			spyOn(Calculator.prototype, "divide");

			calculate("3/4");

			expect(Calculator.prototype.divide).toHaveBeenCalled();
			expect(Calculator.prototype.divide).toHaveBeenCalledWith(4);
		});
		it("calls updateResult (example using and.callThrough)", function() {
			spyOn(window, "updateResult");
			spyOn(Calculator.prototype, "multiply").and.callThrough();

			calculate("5*5");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith(25);
		});
		it("calls updateResult (example using and.callFake)", function() {
			spyOn(window, "updateResult");
			spyOn(Calculator.prototype, "multiply").and.callFake(function(number){
				return "it works";
			});

			calculate("5*5");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith("it works");
		});
		it("calls updateResult (example using and.returnValue)", function() {
			spyOn(window, "updateResult");
			spyOn(Calculator.prototype, "multiply").and.returnValue("it is working");

			calculate("5*5");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith("it is working");
		});
		it("calls updateResult (example using and.returnValues)", function() {
			spyOn(window, "updateResult");
			spyOn(Calculator.prototype, "add").and.returnValues(null, "whatever [add] returns");

			calculate("5+5");

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith("whatever [add] returns");
		});

		it("does not handle errors", function(){
			spyOn(Calculator.prototype, "multiply").and.throwError("some Error");

			expect(function() { calculate("5*5") }).toThrowError("some Error");
		});
		
	});
	describe("updateResult()", function() {
		beforeAll(function() {
			const element = document.createElement("div");
			element.setAttribute("id", "result");
			document.body.appendChild(element);

			this.element = element;
		});
		afterAll(function() {
			document.body.removeChild(this.element);
		});

		it("adds result to the DOM element", function() {
			updateResult("5");
			expect(this.element.innerText).toBe("5");
		});
	});
	describe("showVersion()", function() {
		it("calls caluclator.version", function() {
			spyOn(document, "getElementById").and.returnValue({
				innerText: null
			});

			const spy = spyOnProperty(Calculator.prototype, "version", "get").and.returnValue(
				Promise.resolve()
			)
			showVersion();

			expect(spy).toHaveBeenCalled();

			
		});
	});
});