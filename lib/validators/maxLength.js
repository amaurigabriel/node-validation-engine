//@deprecated, use length validator instead.

var Promise = require('bluebird');

module.exports = function validateMaxLength(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    }

    if (data[field_name].length <= rule.length){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s - maximum of %d characters.', field_name, rule.length);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
};
