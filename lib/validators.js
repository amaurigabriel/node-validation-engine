var validators = {
  'required' : require('./validators/required'),
  'maxLength' : require('./validators/maxLength'),
  'alphanumeric' : require('./validators/alphanumeric'),
  'regExp' : require('./validators/regExp')
};

module.exports = validators;
