'use strict';

var FieldValueDefinition = function FieldValueDefinition (config) {
  if (typeof config === 'string') {
    this.interpretStringConfig(config);
  } else {
    this.interpretObjectConfig(config);
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

/**
* possible data types
* {String[]}
*/
FieldValueDefinition.prototype.types = undefined;

/**
* possible values (only relevant for array types)
* {FieldValueDefinition[]}
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
* Sets own properties based on config object.
* @param {Object} config
* @param {String} [config.description]
* @param {String} [config.type]
* @param {FieldValueDefinition[]} [config.values]
* @param {Object} [config.fields]
*/
FieldValueDefinition.prototype.interpretObjectConfig = function (config) {
  this.description = config.description;
  if (typeof config.type === 'string') {
    this.interpretStringConfig(config.type);
  }
  this.values = this.values || config.values;

  if (config.fields) {
    this.fields = this.getFieldsFromConfigs(config.fields);
  }
};

/**
* Get a map of FieldValueDefinitions from a configuration object.
* @param {Object} fieldsConfig
* @return {Object}
*/
FieldValueDefinition.prototype.getFieldsFromConfigs = function (fieldsConfig) {
  // TODO: Reuse the one from JSONSchema.  Handle circular reference.
  var fields = {};

  Object.keys(fieldsConfig).forEach(function (fieldName) {
    fields[fieldName] = new FieldValueDefinition(fieldsConfig[fieldName]);
  });

  return fields;
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

/**
* Validate a value against this definition.
* @param value
* @return will return the value if it is acceptable for this definition
*/
FieldValueDefinition.prototype.filter = function (value) {
  var typeIdentifier;
  var filtered;
  
  if (!this.types) {
    filtered = value;

  } else {
    typeIdentifier = this.getSchemaTypeIdentifier(value);
    
    if (this.types.indexOf(typeIdentifier) > -1) {
      filtered = value;
      if (typeIdentifier === 'object') {
        filtered = this.filterObjectFields(filtered);
      }
    }
  }

  return filtered;
};

/**
* Filter out any object fields that are not in this schema.
* @param {Object} value
* @return {Object}
*/
FieldValueDefinition.prototype.filterObjectFields = function (value) {
  var filtered = {};

  Object.keys(value).forEach(function (valueFieldName) {
    var valueField = value[valueFieldName];
    var schemaField = this.fields[valueFieldName];

    if (schemaField) {
      if (this.getSchemaTypeIdentifier(valueField) === 'object') {
        filtered[valueFieldName] = schemaField.filterObjectFields(valueField);
      } else {
        filtered[valueFieldName] = schemaField.filter(valueField);
      }
    }
  }, this);

  return filtered;
};

/**
* Get the corresponding JSONSchema data type for a value.
* @param
* @return {String}
*/
FieldValueDefinition.prototype.getSchemaTypeIdentifier = function (value) {
  var type;
  
  // convert to JSON and back to simplify type detection
  value = JSON.parse(JSON.stringify({
    value: value
  })).value;

  type = typeof value;

  if (type === 'object') {
    if (value === null) {
      type = 'null';
    } else if (value instanceof Array) {
      type = 'array';
    }
  }

  return type;
};

module.exports = FieldValueDefinition;