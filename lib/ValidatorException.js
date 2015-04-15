function ValidatorException(message, field, rule, data){
    this.message = message;
    this.field = field;
    this.rule = rule;
    this.data = data;
    this.name = 'ValidatorException';
}

require('util').inherits(ValidatorException, Error);

module.exports = ValidatorException;
