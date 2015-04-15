describe('required', function(){
    var required = require('../lib/validators/required.js');

    it("should expose a function", function(){
      expect(typeof required).toBe('function');
    });

    it("should resolve when data is present", function(done){
      var rule = 'required',
          field_name = 'foo',
          data = {'foo' : '123'};

        required(rule,field_name, data)
          .then(function(){
            expect(1).toBe(1);
            done();
          })
          .catch(function(){
            expect(1).toBe(0);
            done();
          })
          .finally(done)
          .done();
    });

    it("should reject when data is not present", function(done){
      var rule = 'required',
          field_name = 'foo',
          data = {};

        required(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(){
            expect(1).toBe(1);
            done();
          })
          .finally(done)
          .done();
    });

    it("should reject with custom error message when present", function(done){
      var rule = {
            'rule' : 'required',
            'message' : 'error message'
          },
          field_name = 'foo',
          data = {};

        required(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error).toBeDefined();
            expect(error.message).toBeDefined();
            expect(error.message).toBe('error message');
            done();
          })
          .finally(done)
          .done();
    });

    it("should reject with default error message when no error message is specified", function(done){
      var rule = 'required',
          field_name = 'foo',
          data = {};

        required(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error).toBeDefined();
            expect(error.message).toBeDefined();
            expect(error.message).toBe('foo is required.');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the field name to the exception when validation fails",function(done){
      var rule = 'required',
          field_name = 'foo',
          data = {};

      required(rule,field_name, data)
        .then(function(){
          expect(1).toBe(0);
          done();
        })
        .catch(function(error){
          expect(error.field).toBe('foo');
          done();
        })
        .finally(done)
        .done();
    });

    it("should pass the rule object to the exception when validation fails",function(done){
      var rule = {
            rule : 'required',
            message : 'error message'
          },
          field_name = 'foo',
          data = {};

      required(rule,field_name, data)
        .then(function(){
          expect(1).toBe(0);
          done();
        })
        .catch(function(error){
          expect(error.rule).toBeDefined();
          expect(error.rule.rule).toBe('required');
          expect(error.rule.message).toBe('error message');
          done();
        })
        .finally(done)
        .done();
    });

    it("should pass the data object to the exception when validation fails",function(done){
      var rule = 'required',
          field_name = 'foo',
          data = {'bar' : '123'};

        required(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.data.foo).toBeUndefined();
            expect(error.data.bar).toBeDefined();
            done();
          })
          .finally(done)
          .done();
    });

    it("should send a ValidatorException when validation fails",function(done){
      var rule = 'required',
          field_name = 'foo',
          data = {};

        required(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.name).toBeDefined();
            expect(error.name).toBe('ValidatorException');
            done();
          })
          .finally(done)
          .done();
    });
});
