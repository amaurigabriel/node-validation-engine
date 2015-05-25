var Promise = require('bluebird');

module.exports = function validateEmail(rule, field_name, data){
  return new Promise(function(resolve, reject){
    if (typeof data[field_name] === 'undefined'){
      return resolve();
    }

    //http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var ereg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (ereg.test(data[field_name])){
      resolve();
    }
    else{
      var message = '';

      if (typeof rule.message === 'undefined'){
        message = require('util').format('%s is not a valid e-mail address.', field_name);
      }
      else{
        message = rule.message;
      }

      var ValidatorException =  require('../ValidatorException');
      reject(new ValidatorException(message, field_name, rule, data));
    }
  });
};
