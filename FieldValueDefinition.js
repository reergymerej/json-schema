'use strict';

var FieldValueDefinition = function (config) {
  if (typeof config === 'string') {
    this.types = this.getValuesFromTypeString(config);
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
* Get an array of valid types.
* @param {String} types
* @return {String[]}
*/
FieldValueDefinition.prototype.getValuesFromTypeString = function (types) {
  var parsedTypes;
  var arrayTypeMatches = types.match(/[a-z]+(?=\[\])/i);

  if (arrayTypeMatches) {
    parsedTypes = ['array'];
  } else {
    parsedTypes = this.getValidTypes(types);
  }

  return parsedTypes;
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