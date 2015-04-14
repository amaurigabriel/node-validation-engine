# node-validator-engine

This is a validation engine for Node.js. It is not intended to have every possible validation rule in the core, but it is built in such a way that you can easily add external rules.

The main advantage of this module is that you can asynchronously validate every rule of your Model at once:

```js
  People.prototype.save = function(data){
    this.validate().then(function(){
      //save people data
    }
    .catch(function(validation_error){
      //some validation rule was not satisfied
    }
  }
```

It is my first module, so contributions and hints are very welcome!

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
            'length' : 20,
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
  
  Please, note that the only default validators at the moment are `required` and `maxLength`. See the next session to learn how to add custom validators.
  
# Adding Custom Validators
  
It is very simple to add custom validators:

```js
  validator.addValidator('equal', function(rule, field_name, data){
    return new Promise(function(resolve, reject){
      if (data[field_name] === data[rule.fieldToCompare]) return resolve();
      return reject(new validator.ValidatorException('error message', field_name, rule, data);
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
