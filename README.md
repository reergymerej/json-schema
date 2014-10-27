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

a basic example
```js
// JSON
{
  "a": "pi",
  "b": 3.14,
  "c": true,
  "d": null,
  "e": {},
  "f": []
}

// schema
{
  "fields": {
    "a": {},
    "b": {},
    "c": {},
    "d": {},
    "e": {},
    "f": {}
  }
}
```

with suggested properties
```js
// JSON
{
  "a": "pi"
}

// schema
{
  "name": "IrrationalNumber",
  "version": "1.0",
  "description": "This is a hokey JSON structure used to demonstrate JSON Schemas.",
  "fields": {
    "a": {
      "type": "string",
      "description": "irrational number's name"
    }
  }
}
```

with custom properties
```js
// JSON
{
  "a": "pi"
}

// schema
{
  "name": "IrrationalNumber",
  "version": "1.1",
  "description": "This is a hokey JSON structure used to demonstrate JSON Schemas.",
  "url": "https://github.com/reergymerej/json-schema",
  "fields": {
    "a": {
      "type": "string",
      "description": "irrational number's name",
      "approximation": "22/7"
    }
  }
}
``

nested object

array with multiple possibilities

array with itemized values