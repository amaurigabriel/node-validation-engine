var Promise = require('bluebird');

module.exports = function validateRequired(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] !== 'undefined'){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s is required.', field_name);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
};
