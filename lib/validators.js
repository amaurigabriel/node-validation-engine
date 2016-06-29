var validators = {
  'required' : require('./validators/required'),
  //@deprecated, use "length" instead
  'maxLength' : require('./validators/maxLength'),
  'length' : require('./validators/length'),
  'alphanumeric' : require('./validators/alphanumeric'),
  'regExp' : require('./validators/regExp')
};

module.exports = validators;
