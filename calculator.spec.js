describe("calculator.js", function() {
	describe("Calculator", function(){
		let calculator;
		
		beforeEach(function() {
			calculator = new Calculator();
		});

		afterEach(function() {
			
		});
		it("should have common operations", function() {
			expect(calculator.add).toBeDefined();
			expect(calculator.subtract).toBeDefined();
			expect(calculator.multiply).toBeDefined();
			expect(calculator.divide).toBeDefined();
		});
		it("has constructor name", function(){

			expect(calculator.constructor.name).toContain("Calculator");
		});

		it("use custom matcher", function() {
			jasmine.addMatchers(customMatchers);

			expect(calculator).toBeCalculator();
		});

		describe("add()", function(){
			it("should add numbers to total", function() {
				calculator.add(5);
				expect(calculator.total).toBe(5);
			});
		});
		describe("subtract()", function(){
			it("should subtract numbers from total", function() {
				calculator.subtract(5);
				expect(calculator.total).toBe(-5);
			});
		});
		describe("multiply()", function(){
			it("should multiply total by number", function() {
				calculator.multiply(5);
				expect(calculator.total).toBe(0);
			}); 
		});
		describe("divide()", function(){
			it("should divide total by number", function() {
				calculator.divide(5);
				expect(calculator.total).toBe(0);
			});
		});
		describe("get version", function() {
			it("fetches version from external source", async function(done){
				spyOn(window, "fetch").and.returnValue(Promise.resolve(
					new Response('{"version": "0.1"}')
				));

				const version = await calculator.version;
					expect(version).toBe("0.1");

					done();
			});
		});

	});

});