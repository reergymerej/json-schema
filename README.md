# JSON Schema

## Problem

JSON is free-form, so it's difficult to keep track of what's in it.

## Solution

Use a simple notation system for defining schemas.

### Requirements

* schemas should be JSON
* schemas should document meta-data
* meta-data should include schema name
* meta-data should include schema version (String)
* meta-data should be extendable
* schemas should document property names
* schemas should optionally document property descriptions
* schemas should optionally document property value types
* property value types should be indicated by a string
* property value types should be enumerated and cover all acceptable JSON types
* schemas should allow for nested objects

### Schema-Level

*Required Properties*

* (string) name - The name of the schema.
* (string) version - The version of the schema.
* (array) fields - Array of field object definitions.

### Field Object Definitions

*Required Properties*

* name - The name of the field.

*Optional Properties*

* (string) type - JSON value type expected for the the property's value
* (string) description - Description of what this field and it's value are for
* (array) fields - Used when defining nested objects' properties


### Value Types

JSON supports the following types:

* String
* Number
* true
* false
* null
* an object
* an array

These are used in the schema's notation as:

* "string"
* "number"
* "boolean"
* "null"
* "object"
* "array"

### Consumption

How the schema is interpretted is up to the system using it.

## References

* [JSON](http://json.org/)