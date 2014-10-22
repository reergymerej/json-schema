# JSON Schema

## Problem

JSON is free-form, so it's difficult to keep track of what's in it.

## Solution

Use a simple notation system for defining schemas.

### Requirements

* schemas should be JSON
* schemas should document property names
* schemas should optionally document property descriptions
* schemas should optionally document property value types
* property value types should be indicated by a string
* property value types should be enumerated and cover all acceptable JSON types
* schemas should allow for nested objects

### Consumption

How the schema is interpretted is up to the system using it.

## References

* [JSON](http://json.org/)