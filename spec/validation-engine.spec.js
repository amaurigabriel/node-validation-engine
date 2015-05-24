describe('validation engine', function(){
    var validator = require('../validation-engine.js');

    it('should expose an object', function(){
      expect(typeof validator).toBe('object');
    });

    var rules = [
      {
        'field' : 'foo',
        'rules' : [
          {
            'rule' : 'maxLength',
            'length' : 10
          }
        ]
      }
    ];

    it('should accept data when no rules are specified', function(done){
      validator.rules = undefined;
      validator.validate({'foo' : '1234567890'})
        .then(function(){
          expect(1).toBe(1);
          done();
        })
        .catch(function(err){
          expect(1).toBe(0);
          done();
        })
        .finally(done)
        .done();
    });

    it('should accept valid data', function(done){
      validator.rules = rules;
      validator.validate({'foo' : '1234567890'})
        .then(function(){
          expect(1).toBe(1);
          done();
        })
        .catch(function(err){
          expect(1).toBe(0);
          done();
        })
        .finally(done)
        .done();
    });

    it('should reject invalid data', function(done){
      validator.rules = rules;
      validator.validate({'foo' : '12345678901'})
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

    it('should add external validation rule', function(){
        validator.addValidator('is_one', function(rule, field_name, data){
          var Promise = require('bluebird');
          return new Promise(function(resolve, reject){
            if (typeof data[field_name] === 'undefined') return reject();
            if (data[field_name] == "1") return resolve();
            return reject();
          });

        });

        expect(typeof validator.validators.is_one).toBe('function');
    });

    it('should use external validation rule', function(done){
        validator.rules = [
          {
            'field' : 'foo',
            'rules' : [
              'is_one'
            ]
          }
        ];

        validator.validate({'foo' : "1"})
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

    it('should use external validation rule', function(done){
        validator.rules = [
          {
            'field' : 'foo',
            'rules' : [
              'is_one'
            ]
          }
        ];

        validator.validate({'foo' : "0"})
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
});
