var Promise = require('bluebird');

function validateMaxLength(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    }

    if (data[field_name].length <= rule.maxLength){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s - maximum of %d characters.', field_name, rule.maxLength);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
}

function _validateLength(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    }

    if (data[field_name].length == rule.length){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s - required length of %d characters.', field_name, rule.length);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
}

function validateMinLength(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    }

    if (data[field_name].length >= rule.minLength){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s - minimum of %d characters.', field_name, rule.minLength);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
}

function validateBetweenLength(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    }

    if (data[field_name].length >= rule.minLength && data[field_name].length <= rule.maxLength){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s - must have between %d and %d characters.', field_name, rule.minLength, rule.maxLength);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
}

module.exports = function validateLength(rule, field_name, data){  
  if (typeof rule.length !== 'undefined') {
    return _validateLength(rule, field_name, data);
  } else if (typeof rule.maxLength !== 'undefined' && typeof rule.minLength !== 'undefined') {
    return validateBetweenLength(rule, field_name, data);
  } else if (typeof rule.maxLength !== 'undefined') {
    return validateMaxLength(rule, field_name, data);
  } else if (typeof rule.minLength !== 'undefined') {
    return validateMinLength(rule, field_name, data);
  } else {
    return new Promise(function(resolve, reject){
      var message = require('util').format('Missing parameters for "length" validator for field %s.', field_name);

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message));
    });
  }
};
