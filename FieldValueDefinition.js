'use strict';

var FieldValueDefinition = function (config) {
  if (typeof config === 'string') {
    this.interpretStringConfig(config);
  }
};

/**
* hash of valid types
* {Object}
*/
FieldValueDefinition.prototype.VALID_TYPES = {
  "string": true,
  "number": true,
  "boolean": true,
  "null": true,
  "object": true,
  "array": true
};


FieldValueDefinition.prototype.name = undefined;

/**
* possible data types
* {String[]}
*/
FieldValueDefinition.prototype.types = undefined;

/**
* possible values (only relevant for array types)
* {FieldValueDefinitions[]}
*/
FieldValueDefinition.prototype.values = undefined;


FieldValueDefinition.prototype.fields = undefined;

/**
* Sets own `types` and `values` if applicable.
* @param {String} types
*/
FieldValueDefinition.prototype.interpretStringConfig = function (types) {
  var arrayTypeMatches = types.match(/[a-z]+(?=\[\])/i);

  if (arrayTypeMatches) {
    this.types = ['array'];
    this.values = [new FieldValueDefinition(arrayTypeMatches[0])];
  } else {
    this.types = this.getValidTypes(types);
  }
};

/**
* Get an array of valid field value types from a space-delimited string.
* @param {String} types
* @return {String[]}
*/
FieldValueDefinition.prototype.getValidTypes = function (types) {
  var cleanedTypes = [];

  types.split(' ').forEach(function (type) {
    if (this.VALID_TYPES[type]) {
      cleanedTypes.push(type);
    }
  }, this);

  return cleanedTypes;
};

module.exports = FieldValueDefinition;