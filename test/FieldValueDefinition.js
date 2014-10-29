'use strict';

var will = require('willy').will;
var FieldValueDefinition = require('../FieldValueDefinition.js');

describe('When defined as a string', function () {
  it('should indicate types', function () {
    var config = 'boolean';
    var definition = new FieldValueDefinition(config);

    will(definition.types[0]).be('boolean');
  });

  describe('with spaces', function () {
    it('should indicate multiple types', function () {
      var config = 'boolean string';
      var definition = new FieldValueDefinition(config);

      will(definition.types).have(['boolean', 'string']);
    });
  });

  describe('with invalid value types', function () {
    it('should exclude invalid types', function () {
      var config = 'boolean donkey string';
      var definition = new FieldValueDefinition(config);

      will(definition.types).haveOnly(['boolean', 'string']);
    });
  });

  describe('with brackets', function () {
    var definition;
        
    before(function () {
      definition = new FieldValueDefinition('string[]');
    });

    it('should indicate "array" type', function () {
      will(definition.types).have('array');
    });

    it('should indicate a value type for the array', function () {
      will(definition.values[0].types).have('string');
    });
  });
});

describe('When defined as an object', function () {
  it('should not assume any properties have been defined', function () {
    var definition = new FieldValueDefinition({});
    will(definition).not.haveAny(['description', 'types', 'values', 'fields']);
  });

  it('should pick up known properties', function () {
    var definition = new FieldValueDefinition({
      description: 'bar',
      type: 'boolean',
      values: [],
      fields: {}
    });

    will(definition).have(['description', 'types', 'values', 'fields']);
  });

  describe('with sub-fields', function () {
    it('should create FieldValueDefinitions for each sub-field config', function () {
      var definition = new FieldValueDefinition({
        fields: {
          a: 'string',
          b: 'boolean',
          c: 'number'
        }
      });

      will(definition.fields.a).beA(FieldValueDefinition);
      will(Object.keys(definition.fields).length).be(3);
    });
  });
});