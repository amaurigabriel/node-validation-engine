describe('length', function(){
    var length = require('../lib/validators/length.js');

    it("should expose a function", function(){
      expect(typeof length).toBe('function');
    });

    it("should reject a string with length greater than maxlength", function(done){
      var rule = {
        rule : 'length',
        maxLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept a string with length lower than maxlength", function(done){
      var rule = {
        rule : 'length',
        maxLength : 4
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept a string with length equal than maxlength", function(done){
      var rule = {
        rule : 'length',
        maxLength : 3
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should reject a string with length smaller than minLength", function(done){
      var rule = {
        rule : 'length',
        minLength : 4
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept a string with length greater than minLength", function(done){
      var rule = {
        rule : 'length',
        minLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept a string with length equal than minLength", function(done){
      var rule = {
        rule : 'length',
        minLength : 3
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should reject a string with length different than length", function(done){
      var rule = {
        rule : 'length',
        length : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept a string with length equal maxlength", function(done){
      var rule = {
        rule : 'length',
        length : 3
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should reject a string with length not between minLength and maxlength", function(done){
      var rule = {
        rule : 'length',
        minLength : 4,
        maxLength : 6
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept a string with length between minLength and maxlength", function(done){
      var rule = {
        rule : 'length',
        minLength : 1,
        maxLength : 4
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should accept data when the field is undefined", function(done){
      var rule = {
        rule : 'length',
        length : 3
      },
        field_name = 'foo',
        data = {};

        length(rule,field_name, data)
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

    it("should reject with custom error message when present", function(done){
      var rule = {
        rule : 'length',
        length : 2,
        message : 'error message'
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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

    it("should reject with default error message when no error message is specified",function(done){
      var rule = {
        rule : 'length',
        maxLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error).toBeDefined();
            expect(error.message).toBeDefined();
            expect(error.message).toBe('foo - maximum of 2 characters.');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the field name to the exception when validation fails",function(done){
      var rule = {
        rule : 'length',
        maxLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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
        rule : 'length',
        maxLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.rule).toBeDefined();
            expect(error.rule.rule).toBe('length');
            expect(error.rule.maxLength).toBe(2);
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the data object to the exception when validation fails",function(done){
      var rule = {
        rule : 'length',
        maxLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.data.foo).toBeDefined();
            expect(error.data.foo).toBe('123');
            done();
          })
          .finally(done)
          .done();
    });

    it("should returns a rejected Promise with ValidatorException when validation fails",function(done){
      var rule = {
        rule : 'length',
        maxLength : 2
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        length(rule,field_name, data)
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