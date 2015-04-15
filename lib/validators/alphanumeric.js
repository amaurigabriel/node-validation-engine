var Promise = require('bluebird');

module.exports = function validateAlphanumeric(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      resolve();
    }

    var allowed_characters = 'a-z0-9';

    if (rule.whitespace){
      allowed_characters += ' ';
    }

    if (rule.underscore){
      allowed_characters += '_';
    }

    var reg_exp = new RegExp('^[' + allowed_characters + ']*$', 'i');
    if (data[field_name].match(reg_exp)){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s should be alphanumeric.', field_name);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
};
