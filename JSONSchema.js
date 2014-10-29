'use strict';

var FieldValueDefinition = require('./FieldValueDefinition.js');

var JSONSchema = function JSONSchema (config) {
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

/**
* Pass an object of data into the schema and get back those properties
* that fit into the schema.
* @param {Object} data
* @return {Object}
*/
JSONSchema.prototype.filter = function (data) {
  var result = {};

  Object.keys(data).forEach(function (fieldName) {
    var schemaField = this.fields[fieldName];
    var filteredData = schemaField && schemaField.filter(data[fieldName]);
    
    if (filteredData) {
      result[fieldName] = filteredData;
    }
  }, this);

  return result;
};

module.exports = JSONSchema;