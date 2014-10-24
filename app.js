'use strict';

// This demonstrates how a system may use JSON Schemas to
// reliable understand JSON structures.

var fs = require('fs');
var path = require('path');
var reader = require('./schema-reader/reader.js');

var exampleDir = path.join(process.cwd(), 'examples');

/**
* Load a schema from disk (sync).
* @param {String} schema file name
* @return {Object} parsed JSON from schema
*/
var loadSchema = function (schema) {
    var filePath = path.join(exampleDir, schema);
    return JSON.parse(fs.readFileSync(filePath, {
        encoding: 'utf8'
    }));
};

// ./examples/Some.json
// ================================================

// Some.schema.1.0.json
reader.summarize(loadSchema('Some.schema.1.0.json'));
// reader.summarize(loadSchema('Some.schema.1.2.json'));
// reader.summarize(loadSchema('Some.schema.2.0.json'));

// ./examples/More.json
// reader.summarize(loadSchema('More.schema.1.0.json'));

// ./examples/ArrayWithMixed.json
// reader.summarize(loadSchema('ArrayWithMixed.schema.1.0.json'));

// ./examples/MixedTypes.json
// reader.summarize(loadSchema('MixedTypes.schema.1.0.json'));

// ./examples/JSONSchema.schema.1.0.json
// reader.summarize(loadSchema('JSONSchema.schema.1.0.json'));

/**
* Remove all values not covered by the schema.
* @param {Object} data
* @return {Object}
*/
// reader.JSONSchema.prototype.getValid = function (data) {
//     var valid = {};

//     this.fields.forEach(function (field, index, fields) {
//         // console.log(index, field);
//     });

//     return valid;
// };

// var schema = new reader.JSONSchema(loadSchema('Some.schema.1.2.json'));

// var data = {
//     "String field": "pi",
//     "Number field": 3.14,
//     "Boolean field": true,
//     "null field": null,
//     "an object field": {},
//     "an array field": []
// };

// data = schema.getValid(data);

// console.log(data);