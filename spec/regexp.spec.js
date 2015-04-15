describe('regExp validator', function(){
  var regExp = require('../lib/validators/regExp.js');

  it("should expose a function", function(){
    expect(typeof regExp).toBe('function');
  });
  
  var rule = {
    rule : 'regExp',
    reg_exp : '^[0-9]*$'
  };

  it("should reject a string that doesn't match the pattern", function(done){
    var field_name = 'foo',
        data = {'foo' : '1!2@3#4$'};

    regExp(rule, field_name, data)
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

  it("should accept a string that matches the pattern", function(done){
    var field_name = 'foo',
        data = {'foo' : '1234'};

    regExp(rule, field_name, data)
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
    var field_name = 'foo',
        data = {'foo' : '1!2@3#'};

    var rule_custom_error = {
      rule : 'regExp',
      reg_exp : '^[0-9]*$',
      message : 'error message'
    };

    regExp(rule_custom_error, field_name, data)
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
    var field_name = 'foo',
        data = {'foo' : '1!2@3#'};

    regExp(rule,field_name, data)
      .then(function(){
        expect(1).toBe(0);
        done();
      })
      .catch(function(error){
        expect(error).toBeDefined();
        expect(error.message).toBeDefined();
        expect(error.message).toBe('foo should match the ' + rule.reg_exp + ' pattern.');
        done();
      })
      .finally(done)
      .done();
  });

  it("should pass the field name to the exception when validation fails",function(done){
    var field_name = 'foo',
        data = {'foo' : '1!2@3#'};

    regExp(rule,field_name, data)
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
    var field_name = 'foo',
        data = {'foo' : '1!2@3#'};

    regExp(rule,field_name, data)
      .then(function(){
        expect(1).toBe(0);
        done();
      })
      .catch(function(error){
        expect(error.rule).toBeDefined();
        expect(error.rule.rule).toBe(rule.rule);
        expect(error.rule.match).toBe(rule.match);
        done();
      })
      .finally(done)
      .done();
  });

  it("should pass the data object to the exception when validation fails",function(done){
    var field_name = 'foo',
        data = {'foo' : '1!2@3#'};

    regExp(rule,field_name, data)
      .then(function(){
        expect(1).toBe(0);
        done();
      })
      .catch(function(error){
        expect(error.data.foo).toBeDefined();
        expect(error.data.foo).toBe(data.foo);
        done();
      })
      .finally(done)
      .done();
  });

  it("should send a ValidatorException when validation fails",function(done){
      var field_name = 'foo',
          data = {'foo' : '1!2@3#'};

      regExp(rule,field_name, data)
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
