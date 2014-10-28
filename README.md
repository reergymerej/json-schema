# JSON Schema

**Problem**

JSON is free-form, so it's difficult to keep track of what's in it.

**Solution**

Use a simple notation system for defining schemas.

* JSON Schema creation should not be onerous.
* JSON Schemas should allow for easy extension.
* At a minimum, field names should be included.
* <a href="#value-definition">Value definitions</a> should be supported.

## Schema Format

Schemas are JSON with a standardized structure.

*Required Properties*

* **fields** {*object*}  
    fields for each of the name/value pairs in the JSON structure - The names should match those of the names in the JSON.  The values should be <a href="#value-definition">value definitions</a>.

*Optional Properties*

* **name** {*string*}  
    the name of the schema

* **version** {*string*/*number*}  
    the version of the schema

* **description** {*string*}  
    a description of the schema

* Additional name/value pairs may be added as needed, but their interpretation is up to the system consuming the schema.

<a name="value-definition"></a>
### Value Definitions

Value definitions are objects that describe the values of fields (name/value pairs) in the JSON.  Value defnitions may be nested or appear in the list of possible values for arrays.

*Optional Properties*

* **type** {*string*}  
    JSON value type expected for the the property's value, indicate multiple types by separating values with spaces

* **description** {*string*}  
    description of what this field and its value mean

* **fields** {*object*}  
    only valid for "object" and "array" <a href="#value-types">value types</a> - use to define nested fields - The names should match the names in the object.  The values should be <a href="#value-definition">value definitions</a>.  This can be used to define nested objects or to enumerate values in an array.

* **values** {*object[]*}  
    only valid for "array" <a href="#value-types">value types</a> - An array of <a href="#value-definitions">value definitions</a> that may appear in the array.

* Additional name/value pairs may be added as needed, but their interpretation is up to the system consuming the schema.

<a name="value-types"></a>
### Value Types

JSON supports just a few value types.  The following table shows how the JSON data types are referenced in JSON Schema notation.

|[JSON Data Type](http://json.org/)|JSON Schema Notation|
|---|---|
|String|"string"|
|Number|"number"|
|true|"boolean"|
|false|"boolean"|
|null|"null"|
|Object|"object"|
|Array|"array"|

## Usage

JSON Schemas allow for a standardized way to document JSON structures of any shape.  The interpretation of the schemas is up to the system using them, though it would make sense if they adhered to the rules set forth here.  Esoteric extended notation is possible, but isn't expected to be understood by other systems.

## Examples


nested object

array with multiple possibilities

array with itemized values
=======

=======================================
field definitions
used to define a name/value pair
* string[] - names of fields
* object - field names paired with field value definitions

field value definitions
used to describe a field's value
* string - denotes value type
* object - extended field value definition info

possible values
used to describe values that may appear within an array
* object[] - value definitions


================================================
What needs to be documented?
* meta data about the schema
* what fields are in schema
* field values
* additional schema/field info as needed
* enumerated values
* sub-schemas

reserved schema-level properties
* description
* fields
* name
* version

reserved field-level properties
* default
* description
* fields
* schema
* type
* values

concepts
* schema info
* field value info
* value types
* sub-schemas


fields definition
* array
* object


fields definition array

```js
{
  "fields": ["a", "b", "c"]
}
```

fields definition object

names should match the names in the JSON

values should describe the expected values in the JSON

value definitions
* string

string
When a value definition is a string, the string describes the data type.

```js
{
  "fields": {
    "a": "number"
  }
}
```

Separate multiple expected types with spaces.

```js
{
  "fields": {
    "a": "number boolean string"
  }
}
```

Indicate value types in array with brackets.

```js
{
  "fields": {
    "a": "number[]"
  }
}
```

object
Value definition objects allow you to convey more information about the values.  All properties of the value definition are optional.

This is the equivalent of using a fields definition array.

```js
{
  "fields": {
    "a": {}
  }
}
```

value definition properties
* type
* description

type
Use type to describe the value data type.

```js
{
  "fields": {
    "a": {
      "type": "number"
    }
  }
}
```

description

```js
{
  "fields": {
    "a": {
      "description": "This is a human-readable description of what this field represents."
    }
  }
}
```