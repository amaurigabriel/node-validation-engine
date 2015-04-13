var Promise = require('Bluebird'),
    util = require('util');

function ValidatorException(message, field, rule, data){
    this.message = message;
    this.field = field;
    this.rule = rule;
    this.data = data;
    this.name = 'ValidatorException';
}

util.inherits(ValidatorException, Error);

validator = {};

validator.ValidatorException = ValidatorException;
validator.primary = 'id';

validator.validate = function validatorValidate(data){
  if (typeof data === 'undefined' || typeof data[this.primary] === 'undefined'){
    return this.validateOnCreate(data);
  }
  else{
    return this.validateOnUpdate(data);
  }
};

validator.validateOnCreate = function validatorValidateOnCreate (data){
  var promises = [],
    self = this;

  return new Promise(function(resolve, reject){
    require('async').each(self.rules, function(field, callback){
      var rules = field.rules,
          rules_length = rules.length;

      for (var i = 0; i < rules_length; i++){
        setImmediate(function(rule, field_name, data, i){
          if (typeof rule.on === 'undefined' || rule.on === 'create'){
            promises.push(self.validateRule(rule, field_name, data));
          }

          if (i === rules.length - 1){
            callback();
          }
        }, field.rules[i], field.field, data, i);
      }
    }, function(){
      Promise.all(promises).then(resolve).catch(reject);
    });
  });
};

validator.validateOnUpdate = function validatorValidateOnUpdate(data){
  var promises = [],
    self = this;

  return new Promise(function(resolve, reject){
    require('async').each(self.rules, function(field, callback){
      var rules = field.rules,
          rules_length = rules.length;

      for (var i = 0; i < rules_length; i++){
        setImmediate(function(rule, field_name, data, i){
          if (typeof rule.on === 'undefined' || rule.on === 'update'){
            promises.push(self.validateRule(rule, field_name, data));
          }

          if (i === rules.length - 1){
            callback();
          }
        }, field.rules[i], field.field, data, i);
      }
    }, function(err){
      Promise.all(promises).then(resolve).catch(reject);
    });
  });
};

validator.validateRule = function validatorValidateRule(rule, field_name, data){
  var rule_name;

  if (typeof rule === 'string'){
    rule_name = rule;
  }
  else{
    rule_name = rule.rule;
  }

  if (typeof this.validators[rule_name] === 'function'){
    return this.validators[rule_name](rule, field_name, data);
  }
  else{
    return new Promise(function(resolve, reject){
      var sprintf = require('sprintf-js').sprintf;
      reject(new Error(sprintf('Validator for rule %s not found.', rule_name)));
    });    
  }
};

validator.validateRequired = function validatorValidateRequired(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] !== 'undefined'){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        var sprintf = require('sprintf-js').sprintf;
        message = sprintf('%s is required.', field_name);
      }
      else{
        message = rule.message;
      }

      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
};

validator.validateMaxLength = function validatorValidateMaxLength(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined') resolve();

    if (data[field_name].length <= rule.length){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        var sprintf = require('sprintf-js').sprintf;
        message = sprintf('%s - Máximo de %d caracteres.', field_name, rule.length);
      }
      else{
        message = rule.message;
      }

      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
};

validator.rules = [];
validator.validators = {
  'required' : validator.validateRequired,
  'maxLength' : validator.validateMaxLength
};

validator.addValidator = function validatorAddValidator(rule_name, function_handler){
  validator.validators[rule_name] = function_handler;
};

module.exports = validator;
