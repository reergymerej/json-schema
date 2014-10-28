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

    it('it should indicate a value type for the array', function () {
      will(definition.values[0].types).have('string');
    });
  });
});
