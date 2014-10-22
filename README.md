# JSON Schema

**Problem**

JSON is free-form, so it's difficult to keep track of what's in it.

**Solution**

Use a simple notation system for defining schemas.

## Schema Format

Schemas are JSON with a standardized structure.

*Required Properties*

* **name** {*string*}  
    the name of the schema

* **version** {*string*}  
    the version of the schema

* **description** {*string*}  
    a description of the schema

* **fields** {*<a href="#field-definitions">field definition[]</a>*}  
    an *array* of definitions for each of the name/value pairs expected in the JSON structure the schema describes

*Optional Properties*

* Additional name/value pairs may be added as needed, but their interpretation is up to the system consuming the schema.

<a name="field-definitions"></a>
### Field Definitions

Field definitions can be expressed in two formats: *strings* or *objects*.  Use *strings* for basic notation and *objects* for more elaborate field notation.

**Strings**

When defining a field as a *string*, simply use the field's name.

**Objects**

*Required Properties*

* **name** {*string*}  
    the name of the field

*Optional Properties*

* **type** {*string*}  
    JSON value type expected for the the property's value

* **description** {*string*}  
    description of what this field and it's value are for

* **fields** {*<a href="#field-definitions">field definition[]</a>*}  
    only valid for "object" <a href="#value-types">value types</a>, an *array* of definitions for each of the name/value pairs expected in the field's structure

<a name="value-types"></a>
### Value Types

JSON supports just a few data types.  The following table shows how the JSON data types are referenced in JSON Schema notation.

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

JSON Schemas allow for a standardized way to document JSON structures of any shape.  The interpretation of the schemas is up to the system using the schemas.
