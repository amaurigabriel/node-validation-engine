var validators = {
  'required' : require('./validators/required'),
  'maxLength' : require('./validators/maxLength'),
  'alphanumeric' : require('./validators/alphanumeric')
};

module.exports = validators;
