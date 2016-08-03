var Promise = require('bluebird'),
    util = require('util');

validator = {};

validator.ValidatorException = require('./lib/ValidatorException.js');
validator.primary = 'id';

validator.validate = function validatorValidate(data){
  if (typeof this.rules === 'undefined'){
    return Promise.resolve();
  }
  else if (typeof data === 'undefined' || typeof data[this.primary] === 'undefined'){
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
      reject(new Error('Validator for rule ' + rule_name + ' not found.'));
    });
  }
};

validator.rules = [];
validator.validators = require('./lib/validators.js');

validator.addValidator = function validatorAddValidator(rule_name, function_handler){
  validator.validators[rule_name] = function_handler;
};

module.exports = validator;
