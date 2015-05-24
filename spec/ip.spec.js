describe('ip', function(){
    var ip = require('../lib/validators/ip.js');

    it("should expose a function", function(){
      expect(typeof ip).toBe('function');
    });

    it("should accept empty ip", function(done){
      var rule = 'ip',
          field_name='foo',
          data = {};

          ip(rule, field_name, data)
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

    it("should accept a valid ipv4", function(done){
      var rule = 'ip',
          field_name='foo',
          data = {foo : '255.255.255.255'};

          ip(rule, field_name, data)
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

    it("should accept a valid ipv6", function(done){
      var rule = 'ip',
          field_name='foo',
          data = {foo : 'FE80::0202:B3FF:FE1E:8329'};

          ip(rule, field_name, data)
            .then(function(){
              expect(1).toBe(1);
              data = {foo : 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329'};
              return ip(rule, field_name, data);
            })
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

    it("should reject an invalid ip", function(done){
      var rule = 'ip',
          field_name = 'foo',
          data = {'foo' : '123'};

        ip(rule, field_name, data)
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
        rule : 'ip',
        message : 'error message'
      },
        field_name = 'foo',
        data = {'foo' : '123'};

        ip(rule,field_name, data)
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
      var rule = 'ip',
          field_name = 'foo',
          data = {'foo' : '123'};

        ip(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error).toBeDefined();
            expect(error.message).toBeDefined();
            expect(error.message).toBe('foo is not a valid IPV4 or IPV6.');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the field name to the exception when validation fails",function(done){
      var rule = 'ip',
        field_name = 'foo',
        data = {'foo' : '123'};

        ip(rule,field_name, data)
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
      var rule = 'ip',
        field_name = 'foo',
        data = {'foo' : '123'};

        ip(rule,field_name, data)
          .then(function(){
            expect(1).toBe(0);
            done();
          })
          .catch(function(error){
            expect(error.rule).toBeDefined();
            expect(error.rule).toBe('ip');
            done();
          })
          .finally(done)
          .done();
    });

    it("should pass the data object to the exception when validation fails",function(done){
      var rule = 'ip',
        field_name = 'foo',
        data = {'foo' : '123'};

        ip(rule,field_name, data)
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
      var rule = 'ip',
        field_name = 'foo',
        data = {'foo' : '123'};

        ip(rule,field_name, data)
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
