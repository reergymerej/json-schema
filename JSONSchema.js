'use strict';

var FieldValueDefinition = require('./FieldValueDefinition.js');

var JSONSchema = function (config) {
  this.initExpectedProperties(config);
};

/**
* Sets own properties from config.
* @param {Object}
*/
JSONSchema.prototype.initExpectedProperties = function (config) {
  this.name = config.name;
  this.description = config.description;
  this.version = config.version;
  if (config.fields) {
    this.fields = this.getFieldsFromConfigs(config.fields);
  }
};

/**
* Get a map of FieldValueDefinitions from a config object.
* @param {Object} fieldsConfig
* @return {Object}
*/
JSONSchema.prototype.getFieldsFromConfigs = function (fieldsConfig) {
  var fields = {};

  Object.keys(fieldsConfig).forEach(function (fieldName) {
    fields[fieldName] = new FieldValueDefinition(fieldsConfig[fieldName]);
  });

  return fields;  
};

module.exports = JSONSchema;