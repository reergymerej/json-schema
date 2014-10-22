'use strict';

// This demonstrates how a system may use JSON Schemas to
// reliable understand JSON structures.

var fs = require('fs');
var path = require('path');
var reader = require('./schema-reader/reader.js');

var exampleDir = path.join(process.cwd(), 'examples');

// ./examples/Some.json


// ./examples/More.json
