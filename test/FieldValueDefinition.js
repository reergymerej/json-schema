'use strict';

var will = require('willy').will;
var FieldValueDefinition = require('../FieldValueDefinition.js');

describe('FieldValueDefinition', function () {
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

    describe('arrays', function () {
      it('should pick up the acceptable value definitions', function () {
        var fvd = new FieldValueDefinition({
          fields: {
            a: {
              type: 'array',
              values: [
                'string',
                'boolean'
              ]
            }
          }
        });

        will(fvd.fields.a.values[0].types).haveOnly('string');
      });
    });
  });

  describe('determining types', function () {
    var getType = FieldValueDefinition.prototype.getSchemaTypeIdentifier;

    it('should work for strings', function () {
      will(getType('foo')).be('string');
      will(getType(new String())).be('string'); // jshint ignore:line
    });

    it('should work for numbers', function () {
      will(getType(123)).be('number');
      will(getType(new Number())).be('number'); // jshint ignore:line
    });

    it('should work for booleans', function () {
      will(getType(false)).be('boolean');
      will(getType(new Boolean())).be('boolean'); // jshint ignore:line
    });

    it('should work for null', function () {
      will(getType(null)).be('null');
    });

    it('should work for objects', function () {
      will(getType({})).be('object');
      will(getType(new Object())).be('object'); // jshint ignore:line
    });

    it('should work for arrays', function () {
      will(getType([])).be('array');
      will(getType(new Array())).be('array'); // jshint ignore:line
    });
  });

  describe('filtering', function () {
    it('should return the value if no types were defined', function () {
      var fvd = new FieldValueDefinition({});
      var filtered = fvd.filter(123);
      will(filtered).be(123);
    });

    it('should return undefined if the data does not match the field\'s types', function () {
      var fvd = new FieldValueDefinition('string');
      var filtered = fvd.filter(123);
      will(filtered).beUndefined();
    });

    it('should the value if it matches one of the field\'s types', function () {
      var fvd = new FieldValueDefinition('boolean string');
      var filtered = fvd.filter('foo');
      will(filtered).be('foo');
    });

    it('should work for single value types as well', function () {
      var fvd = new FieldValueDefinition('null');
      will(fvd.filter(null)).be(null);
    });

    describe('object value types', function () {
      var fvd = new FieldValueDefinition({
        type: 'object',
        fields: {
          a: 'string',
          b: {
            type: 'object',
            fields: {
              c: 'number',
              d: 'boolean'
            }
          }
        }
      });

      var value = {
        a: 'foo',
        b: {
          c: 123,
          d: 456,
          e: 'asdf'
        },
        c: false
      };

      it('should work recursively on objects', function () {
        var filtered = fvd.filter(value);

        will(filtered.a).be('foo');
        will(filtered).not.haveAny('c');
        will(filtered.b.c).be(123);
        will(filtered.b).not.haveAny(['d', 'e']);
      });
    });

    // describe.only('array values types', function () {
    //   var fvd = new FieldValueDefinition({
    //     type: 'array',
    //     values: [
    //       {}
    //     ]
    //   });
    // });
  });
});