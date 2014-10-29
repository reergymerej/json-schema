'use strict';

var will = require('willy').will;
var JSONSchema = require('../JSONSchema.js');
var FieldValueDefinition = require('../FieldValueDefinition.js');

describe('JSONSchema', function () {
  describe('basic fields', function () {
    var schema;

    before(function () {
      schema = new JSONSchema({
        name: 'foo',
        description: 'bar',
        version: 'baz',
        fields: {}
      });
    });

    it('should set "name"', function () {
      will(schema.name).be('foo');
    });

    it('should set "description"', function () {
      will(schema.description).be('bar');
    });

    it('should set "version"', function () {
      will(schema.version).be('baz');
    });

    it('should set "fields"', function () {
      will(schema).haveOwn('fields');
    });
  });

  describe('fields', function () {
    var schema;

    before(function () {
      schema = new JSONSchema({
        fields: {
          a: 'string',
          b: 'number',
          c: 'string[]'
        }
      });
    });

    it('should create a field for each field', function () {
      will(Object.keys(schema.fields)).have(['a', 'b', 'c']);
    });

    it('should create a map of FieldValueDefinitions', function () {
      will(schema.fields.a).beA(FieldValueDefinition);
    });
  });

  describe('filter', function () {
    var schema;

    before(function () {
      schema = new JSONSchema({
        fields: {
          a: 'boolean',
          b: 'number',
          c: 'string',
          d: {}
        }
      });
    });

    it('should return an object', function () {
      will(schema.filter({})).beAn(Object);
    });

    it('should return fields defined in schema', function () {
      var filtered = schema.filter({
        a: true,
        b: 123,
        c: 'foo'
      });

      will(Object.keys(filtered)).have(['a', 'b', 'c']);
    });

    it('should skip if data does not match type', function () {
      var filtered = schema.filter({
        c: 999
      });

      will(filtered).not.haveOwn('c');
    });
  });
});