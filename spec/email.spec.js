describe('e-mail validator', function(){
    var email = require('../lib/validators/email.js');

    it("should expose a function", function(){
      expect(typeof email).toBe('function');
    });

    it("should accept empty emails", function(done){
      var rule = 'email',
          field_name='foo',
          data = {};

          email(rule, field_name, data)
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

    it("should accept a valid email", function(done){
      var rule = 'ip',
          field_name='foo',
          data = {foo : 'test@test.com'};

          email(rule, field_name, data)
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

    it("should reject an invalid email", function(done){
      var rule = 'email',
          field_name = 'foo',
          data = {'foo' : '123'};

        email(rule, field_name, data)
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
        rule : 'email',
        message : 'error message'
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        email(rule,field_name, data)
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
      var rule = 'email',
          field_name = 'foo',
          data = {'foo' : '123'};

        email(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error).toBeDefined();
            expect(error.message).toBeDefined();
            expect(error.message).toBe('foo is not a valid e-mail address.');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the field name to the exception when validation fails",function(done){
      var rule = 'email',
        field_name = 'foo',
        data = {'foo' : '123'};

        email(rule,field_name, data)
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
      var rule = 'email',
        field_name = 'foo',
        data = {'foo' : '123'};

        email(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.rule).toBeDefined();
            expect(error.rule).toBe('email');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the data object to the exception when validation fails",function(done){
      var rule = 'email',
        field_name = 'foo',
        data = {'foo' : '123'};

        email(rule,field_name, data)
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

    it("should send a ValidatorException when validation fails",function(done){
      var rule = 'email',
        field_name = 'foo',
        data = {'foo' : '123'};

        email(rule,field_name, data)
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
