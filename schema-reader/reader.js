'use strict';

var JSONSchema = function (config) {
    this.name = config.name;
    this.version = config.version;
    this.description = config.description;

    if (config.fields) {
        this.fields = parseFields(config.fields);
    }
};

JSONSchema.prototype.summarize = function () {
    console.log('"%s", version %s\n%s',
        this.name, this.version, this.description);

    console.log('has %d field(s)', this.fields.length);
    this.fields.forEach(function (field) {
        field.summarize(0);
    });
};

var Field = function (config) {
    if (typeof config === 'string') {
        this.name = config;
    } else {
        this.name = config.name;
        this.type = config.type;
        this.description = config.description;

        if (this.type === 'object' && config.fields) {
            this.fields = parseFields(config.fields);
        }
    }
};

/**
* @param {Number} depth
*/
Field.prototype.summarize = function (depth) {
    var indent = function () {
        var str = '';
        while (str.length <= depth) {
            str += '  ';
        }
        return str;
    };

    var left = indent();

    console.log('\n');
    console.log('%s%s%s: %s', left, left, 'name', this.name);
    console.log('%s%s%s: %s', left, left, 'type', this.type);
    console.log('%s%s%s: %s', left, left, 'description', this.description);
    if (this.fields) {
        console.log('%s%shas %d field(s)', left, left, this.fields.length);
        this.fields.forEach(function (field) {
            field.summarize(depth + 2);
        });
    }
};

/**
* @param {String[]/Object[]} fields
* @return {Field[]}
*/
var parseFields = function (fields) {
    var parsed = [];
    fields.forEach(function (field) {
        parsed.push(new Field(field));
    });
    return parsed;
};

/**
* Prints a summary of a JSON Schema.
* @param {Object} schema - a JSON Schema
*/
var summarize = function (schema) {
    var jsonSchema = new JSONSchema(schema);
    jsonSchema.summarize();
};

exports.summarize = summarize;