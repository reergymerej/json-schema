'use strict';

var FieldValueDefinition = function (config) {
  if (typeof config === 'string') {
    this.types = this.parseTypes(config);
  }
};

FieldValueDefinition.prototype.validTypes = 
  'string|number|boolean|boolean|null|object|array'.split('|');
FieldValueDefinition.prototype.name = undefined;
FieldValueDefinition.prototype.types = undefined;
FieldValueDefinition.prototype.values = undefined;
FieldValueDefinition.prototype.fields = undefined;

/**
* Get an array of valid types.
* @param {String} types
* @return {String[]}
*/
FieldValueDefinition.prototype.parseTypes = function (types) {
  var validTypes = [];

  types.split(' ').forEach(function (type) {
    if (this.validTypes.indexOf(type) > -1) {
      validTypes.push(type);
    }
  }, this);

  return validTypes;
};

module.exports = FieldValueDefinition;