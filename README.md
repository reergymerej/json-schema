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

* **version** {*string*/*number*}  
    the version of the schema

* **description** {*string*}  
    a description of the schema

* **fields** {*object*}  
    name/value pairs for each of the name/value pairs expected in the JSON structure the schema describes - The names should match those of the names in the JSON.  The values should be <a href="#value-definition">value definition</a>.

*Optional Properties*

* Additional name/value pairs may be added as needed, but their interpretation is up to the system consuming the schema.

<a name="value-definition"></a>
### Field Definition

*Optional Properties*

* **type** {*string*}  
    JSON value type expected for the the property's value, indicate multiple types by separating values with a space

* **description** {*string*}  
    description of what this field and its value are for

* **fields** {*object*}  
    only valid for "object" <a href="#value-types">value types</a> - name/value pairs for the name/value pairs in this object - The names should match the names in the object.  The values should be <a href="#value-definition">value definition</a>.

* **values** {*object[]*}  
    only valid for "array" <a href="#value-types">value types</a> - An array of <a href="#value-definition">value definition</a> that may appear in the field.

* Additional name/value pairs may be added as needed, but their interpretation is up to the system consuming the schema.

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

JSON Schemas allow for a standardized way to document JSON structures of any shape.  The interpretation of the schemas is up to the system using them, though it would make sense if they adhered to the rules set forth here.  Esoteric extended notation is possible, but isn't expected to be understood by other systems.
