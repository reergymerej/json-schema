'use strict';

var FieldValueDefinition = function (config) {
  if (typeof config === 'string') {
    this.interpretStringConfig(config);
  }
};

FieldValueDefinition.prototype.VALID_TYPES = 
  'string|number|boolean|boolean|null|object|array'.split('|');


FieldValueDefinition.prototype.name = undefined;

/**
* {String[]} possible data types
*/
FieldValueDefinition.prototype.types = undefined;
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
    if (this.VALID_TYPES.indexOf(type) > -1) {
      cleanedTypes.push(type);
    }
  }, this);

  return cleanedTypes;
};

module.exports = FieldValueDefinition;