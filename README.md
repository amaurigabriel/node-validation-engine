# node-validation-engine

This is a validation engine for Node.js. It is not intended to have every possible validation rule in the core, but it is built in such a way that you can easily add external rules.

The main advantage of this module is that you can asynchronously validate every rule of your Model at once:

```js
  People.prototype.save = function(data){
    this.validate(data).then(function(){
      //save people data
    }
    .catch(function(validation_error){
      //some validation rule was not satisfied
    }
  }
```

It is my first module, so contributions and hints are very welcome!

# Installation

Use

```
  npm install validation-engine
```

# Configuring Validation Rules for a Model

You can use directly the `rules` property of the `validator` object:
  
  ```js
    var validator = require('validator-engine');
    
    validator.rules = [
      {
        'field' : 'email',
        'rules' : [
          'required',
           {
            //these parameters are passed to the validator function as arguments
            'rule' : 'maxLength',
            'length' : 255,
            'message' : 'Maximum of 255 characters'
          },
          'email',
          //you can run database queries asynchronously
          'unique'  
        ]
      },
      {
        'field' : 'email_confirmation',
        'rules' : [{
          'rule' : 'equal',
          'fieldToCompare' : 'email'
        }]
      }
    ];
  ```
  
  **obs:** Check the [core validators here](#core-validators).
  
# Adding Custom Validators
  
It is very simple to add custom validators:

```js
  var Promise = require('bluebird');

  validator.addValidator('equal', function(rule, field_name, data){
    return new Promise(function(resolve, reject){
      if (data[field_name] === data[rule.fieldToCompare]) return resolve();
      return reject(new validator.ValidatorException('error message', field_name, rule, data));
    });
  });
  ```
  
  You can even extend the module object with all of your validation rules at once. At `lib/myValidator.js`. put
  
  ```js
    var validator = require('validator-engine');
    
    //add your validators
    
    module.exports = validator;
  ```
  
  So, at your model, you can use
  
```js
  var validator = require('../lib/myValidator');
```

# Conditional Validation

You may choose to check certain validation rules only when inserting or updating data, using the `on` option in the rule

```js
  validator.rules = [
    {
      'field' : 'email',
      'rules' : [{
        'rule' : 'required',
        'on' : 'create'
      }]
    }
  ];
```

The accepted values for `on` are `create` and `update`. The module checks if the current operation is create or update looking for the
`primary` option.

If `data[validator.primary]` is present, the operation is update; otherwise, it is create. The default value for `primary` is `id`, but
you can change it to any value you need.

```js
  validator.primary = 'email';
```

# Core validators
There are some validators in the core. All the core validators accept `undefined` values, except, of course, `required`. They all have default error messages, but you are encouraged to customize them. To do it, use the `message` parameter.

- `length` validate the `string.length` property. Parameters:
  - `length` (*optional*) if set, `string.length` must match its value;
  - `minLength` (*optional*) if set, `string.length` must be greater or equal to its value;
  - `maxLength` (*optional*) if set, `string.length` must be less or equal to its value;

 You can combine `minLength` and `maxLength` in the same rule, in such a way that `string.length` must be between `minLength` (inclusive) and `maxLenght` (inclusive).
- `required` check if `typeof data[field_name]` is not `undefined`.
- `alphanumeric` - check if the field has only letters and numbers. Optionally, this rule may accept whitespaces and underscores too. Parameters:
  - `whitespace` (*default : false*) if `true`, whitespaces are allowed.
  - `underscore` (*default : false*) if `tre`, underscores are allowed.
- `regExp` check if the field match a regular expression. Parameters:
  - `reg_exp` (*required*) - regular expression which the field should match.

