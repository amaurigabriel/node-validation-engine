describe("alphanumeric", function(){
    var alphanumeric = require('../lib/validators/alphanumeric.js');

    it("should expose a function", function(){
        expect(typeof alphanumeric).toBe('function');
    });

    it("should accept alphanumeric string", function(done){
      var rule = 'alhpanumeric',
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should accept spaces when specified", function(done){
      var rule = {
            rule : 'alhpanumeric',
            whitespace : true
          },
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstu   vwxy zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should not accept spaces when specified", function(done){
      var rule = {
            rule : 'alhpanumeric',
            whitespace : false
          },
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstu   vwxy zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should not accept spaces when whitespace option is not specified", function(done){
      var rule = {
            rule : 'alhpanumeric'
          },
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstu   vwxy zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should accept underscores when specified", function(done){
      var rule = {
            rule : 'alhpanumeric',
            underscore : true
          },
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstu___vwxy_zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should not accept underscores when specified", function(done){
      var rule = {
            rule : 'alhpanumeric',
            whitespace : false
          },
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstu___vwxy_zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should not accept underscores when underscore option is not specified", function(done){
      var rule = {
            rule : 'alhpanumeric'
          },
          field_name = 'foo',
          data = {
            'foo' : '1234567890abcdefghijklmnopqrstu___vwxy_zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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

    it("should accept whitespace and underscores when specified", function(done){
        var rule = {
            rule : 'alhpanumeric',
            whitespace : true,
            underscore : true
          },
          field_name = 'foo',
          data = {
            'foo' : '1  2345  _6  _  7890abcdefghijklmnopqrstu___vwxy_zABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

      alphanumeric(rule, field_name, data)
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
      var rule = 'alphanumeric',
          field_name = 'foo',
          data = {};

        alphanumeric(rule,field_name, data)
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
        rule : 'alphanumeric',
        message : 'error message'
      },
        field_name = 'foo',
        data = {'foo' : '*'};

        alphanumeric(rule,field_name, data)
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
      var rule = 'alphanumeric',
          field_name = 'foo',
          data = {'foo' : '*'};

        alphanumeric(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error).toBeDefined();
            expect(error.message).toBeDefined();
            expect(error.message).toBe('foo should be alphanumeric.');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the field name to the exception when validation fails",function(done){
      var rule = 'alphanumeric',
          field_name = 'foo',
          data = {'foo' : '*'};

        alphanumeric(rule,field_name, data)
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
      var rule = 'alphanumeric',
          field_name = 'foo',
          data = {'foo' : '*'};

        alphanumeric(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.rule).toBe('alphanumeric');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the data object to the exception when validation fails",function(done){
      var rule = 'alphanumeric',
          field_name = 'foo',
          data = {'foo' : '*'};

        alphanumeric(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.data.foo).toBeDefined();
            expect(error.data.foo).toBe('*');
            done();
          })
          .finally(done)
          .done();
    });

    it("should send a ValidatorException when validation fails",function(done){
      var rule = '*',
          field_name = 'foo',
          data = {'foo' : '*'};

        alphanumeric(rule,field_name, data)
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
