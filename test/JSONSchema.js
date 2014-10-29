'use strict';

var will = require('willy').will;
var JSONSchema = require('../JSONSchema.js');
var FieldValueDefinition = require('../FieldValueDefinition.js');

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