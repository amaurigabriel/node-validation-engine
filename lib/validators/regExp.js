var Promise = require('bluebird');

module.exports = function validateRegExp(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    } 

    if (data[field_name].match(rule.reg_exp)){
      return resolve();
    }

    var message = '';

    if (typeof rule.message === 'undefined'){
      message = require('util').format('%s should match the %s pattern.', field_name, rule.reg_exp);
    }
    else{
      message = rule.message;
    }

    var ValidatorException =  require('../ValidatorException');
    reject(new ValidatorException(message, field_name, rule, data));
  });
};
