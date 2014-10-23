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

    if (this.fields.length) {
        console.log('field(s):');
        this.fields.forEach(function (field) {
            field.summarize(0);
        });
    }
};

var Field = function (config) {
    this.name = config.name;
    this.type = config.type;
    this.types = this.parseTypes(config.type);
    this.description = config.description;

    if (this.types.object || this.types.array) {
        if (config.fields) {
            this.fields = parseFields(config.fields);
        }
    }
};

/**
* Returns a hash of the types for this field.
* @param {String} types
* @return {Object}
*/
Field.prototype.parseTypes = function (types) {
    var validTypes = ['string', 'number', 'boolean', 'null', 'object', 'array'];
    var typesHash = {};

    if (types) {
        types = types.split(' ');
        types.forEach(function (type) {
            if (validTypes.indexOf(type) > -1) {
                typesHash[type] = true;
            }
        });
    }

    return typesHash;
};

/**
* @param {Number} depth
* @param {Boolean} [asArrayFields]
*/
Field.prototype.summarize = function (depth, asArrayFields) {
    var indent = function () {
        var str = '';
        while (str.length <= depth) {
            str += '  ';
        }
        return str;
    };

    var left = indent();

    // Fields defined within an array don't have names.
    if (!asArrayFields) {
        console.log('%s%s%s: %s', left, left, 'name', this.name);
    }

    if (this.type) {
        console.log('%s%s%s: %s', left, left, 'type(s)', this.type);
    }

    if (this.description) {
        console.log('%s%s%s: %s', left, left, 'description', this.description);
    }
    
    if (this.fields) {
        console.log('%s%sfield(s):', left, left);
        this.fields.forEach(function (field) {
            field.summarize(depth + 2, this.types.array);
        }, this);
    }
    console.log('%s%s---------', left, left);
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