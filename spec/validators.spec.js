describe('validators', function(){
    var validators = require('../lib/validators.js');

    it('should expose an object', function(){
      expect(typeof validators).toBe('object');
    });

    it('should expose a validator for maxLength', function(){
      expect(typeof validators.maxLength).toBe('function');
    });

    it('should expose a validator for alphanumeric', function(){
      expect(typeof validators.alphanumeric).toBe('function');
    });

    it('should expose a validator for required', function(){
      expect(typeof validators.required).toBe('function');
    });

    it('should expose a validator for regExp', function(){
      expect(typeof validators.regExp).toBe('function');
    });
});
