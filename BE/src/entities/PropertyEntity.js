const {EntitySchema} = require("typeorm");

const Property = new EntitySchema({
   name: "Property",
   tableName: "Properties",
   columns: {
    id: {
        primary:true,
        type: "int",
        generated: true
    },
    property_name: {
        type: "varchar",
        unique:true
    },
    property_description: {
        type:"varchar"
    },
    property_price: {
        type:"int"
    },
    property_image: {
        type:"varchar"
    },
    city: {
        type:"varchar"
    }
   }
});

module.exports = Property;