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
    fields for each of the fields pairs in the JSON structure the schema describes - The names should match those of the names in the JSON.  The values should be <a href="#value-definition">value definitions</a>.

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

Value definitions are objects that describe the values of fields (name/value pairs) in the JSON.  Value defnitions may be nested or appear in possible values for arrays.

*Optional Properties*

* **type** {*string*}  
    JSON value type expected for the the property's value, indicate multiple types by separating values with spaces

* **description** {*string*}  
    description of what this field and its value mean

* **fields** {*object*}  
    only valid for "object" <a href="#value-types">value types</a> - used to define nested fields - The names should match the names in the object.  The values should be <a href="#value-definition">value definitions</a>.

* **values** {*object[]*}  
    only valid for "array" <a href="#value-types">value types</a> - An array of <a href="#value-definitions">value definitions</a> that may appear in the array.

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

## Examples

```js
// JSON Example
{
    "String field": "pi",
    "Number field": 3.14,
    "Boolean field": true,
    "null field": null,
    "an object field": {},
    "an array field": []
}

// A Very Basic JSON Schema
{
  "fields": {
    "String field": {},
    "Number field": {},
    "Boolean field": {},
    "null field": {},
    "an object field": {},
    "an array field": {}
  }
}

// A Descriptive JSON Schema
{
  "name": "Some",
  "version": "1.1",
  "description": "contrived object used to demonstrate each value type",
  "fields": {
    "String field": {
      "type": "string",
      "description": "a field with a string value"
    },
    "Number field": {
      "type": "number",
      "description": "a field with a number value"
    },
    "Boolean field": {
      "type": "boolean",
      "description": "a field with a boolean value"
    },
    "null field": {
      "type": "null",
      "description": "a field with a null value"
    },
    "an object field": {
      "type": "object",
      "description": "a field with an object value"
    },
    "an array field": {
      "type": "array",
      "description": "a field with an array value"
    }
  }
}
```

**Complex Structure Example**
```js
// JSON Example
{
    "foo": {
        "bar": {
            "baz": true,
            "quux": [1, 2, 3]
        }
    }
}

// JSON Schema (basic)
{
  "fields": {
    "foo": {
      "fields": {
        "bar": {
          "fields": {
            "baz": {},
            "quux": {}
          }
        }
      }
    }
  }
}

// JSON Schema (elaborate)
{
  "name": "More",
  "version": "1.1",
  "description": "a complex JSON structure used for demonstration",
  "fields": {
    "foo": {
      "fields": {
        "bar": {
          "fields": {
            "baz": {
              "type": "boolean",
              "description": "some random boolean field"
              },
            "quux": {
              "type": "array",
              "description": "an array used to hold numbers",
              "values": [
                {
                  "type": "number"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```