const { AppDataSource } = require("../ormconfig");
const Property = require("../entities/PropertyEntity");
const properties = require('../data/property');
const fs = require('fs');
const path = require("path");

function addPropertyToJson() {
    const foundProperty = properties.find(
        (prop) => prop.property_name.toLowerCase() === property_name.toLowerCase()
      );
    if(foundProperty) {
        return { statusCode: 409, message: "Property is already registered." };
    }
    const newProperty = {
        id: properties.length + 1,
        property_name,
        property_description,
        property_price,
        property_image,
        city
      };
      properties.push(newProperty);
      const propertyFilePath = path.join(__dirname, "../data/property.json");
      fs.writeFileSync(propertyFilePath, JSON.stringify(properties, null, 2));
      console.log("✅ New property added (fallback):", newProperty);
    return {
        statusCode: 201,
        message: "Property added in Json file",
        property: newProperty
      };
}

const propertyService ={
    getAllProperties:async(req,res) => {
    
        const propertyRepository = AppDataSource.getRepository(Property);
        try {
            const dbIsInitialized = AppDataSource.isInitialized;
            if(dbIsInitialized) {
                const propertyies = await propertyRepository.find()
                console.log("courssss",propertyies)
                return res.status(200).json({ propertyies });
            }else {
                return res.status(200).json({properties})
            }
        } catch (error) {
            console.log(error)
            
        }
    },

    

    addProperty: async (req, res) => {
        const { property_name, property_description, property_price, property_image, city} = req.body;
        if (!property_name) {
            return res.status(400).json({ message: "property name is required." });
        }
        const propertyRepository = AppDataSource.getRepository(Property);
        try {
            const dbIsInitialized = AppDataSource.isInitialized;
            if(dbIsInitialized) {
                const isPropertyAvailable = await propertyRepository.findOneBy({property_name})
                if(isPropertyAvailable){
                    return res.status(409).json({ message: "Property is already registered." });
                }
                const newProperty = propertyRepository.create({ property_name, property_description, property_price, property_image, city });
                const savedProperty = await propertyRepository.save(newProperty);
        
                return res.status(201).json({ message: "Property added successfully", property: savedProperty });
            }else {
                const foundProperty = properties.find(
                    (prop) => prop.property_name.toLowerCase() === property_name.toLowerCase()
                  );
                if(foundProperty) {
                    return res.status(409).json({ message: "Property is already registered." });
                }
                const newProperty = {
                    id: properties.length + 1,
                    property_name,
                    property_description,
                    property_price,
                    property_image,
                    city
                  };
                  properties.push(newProperty);
                  const propertyFilePath = path.join(__dirname, "../data/property.json");
                  fs.writeFileSync(propertyFilePath, JSON.stringify(properties, null, 2));
                  return res.status(201).json({ message: "Property added in Json file", property: newProperty });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    editProperty: async (req, res) => {
        const { id } = req.params;
        const { property_name, property_description, property_price, property_image, city } = req.body;
      
        const propertyRepository = AppDataSource.getRepository(Property);
      
        try {
          const dbIsInitialized = AppDataSource.isInitialized;
      
          if (dbIsInitialized) {
            const existingProperty = await propertyRepository.findOneBy({ id: parseInt(id) });
      
            if (!existingProperty) {
              return res.status(404).json({ message: "Property not found in database." });
            }
      
            // Update fields
            existingProperty.property_name = property_name || existingProperty.property_name;
            existingProperty.property_description = property_description || existingProperty.property_description;
            existingProperty.property_price = property_price || existingProperty.property_price;
            existingProperty.property_image = property_image || existingProperty.property_image;
            existingProperty.city = city || existingProperty.city;
      
            const updatedProperty = await propertyRepository.save(existingProperty);
      
            console.log("✅ Property updated (DB):", updatedProperty);
            return res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
      
          } else {
            // Fallback: Update JSON
            const propertyIndex = properties.findIndex(prop => prop.id === parseInt(id));
            if (propertyIndex === -1) {
              return res.status(404).json({ message: "Property not found in JSON." });
            }
      
            const updatedProperty = {
              ...properties[propertyIndex],
              property_name: property_name || properties[propertyIndex].property_name,
              property_description: property_description || properties[propertyIndex].property_description,
              property_price: property_price || properties[propertyIndex].property_price,
              property_image: property_image || properties[propertyIndex].property_image,
              city: city || properties[propertyIndex].city
            };
      
            properties[propertyIndex] = updatedProperty;
      
            const propertyFilePath = path.join(__dirname, "../data/property.json");
            fs.writeFileSync(propertyFilePath, JSON.stringify(properties, null, 2));
      
            console.log("✅ Property updated (JSON):", updatedProperty);
            return res.status(200).json({ message: "Property updated in JSON file", property: updatedProperty });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error." });
        }
    },

    deleteProperty: async (req, res) => {
      const { id } = req.params;
    
      const propertyRepository = AppDataSource.getRepository(Property);
    
      try {
        const dbIsInitialized = AppDataSource.isInitialized;
    
        if (dbIsInitialized) {
          const existingProperty = await propertyRepository.findOneBy({ id: parseInt(id) });
    
          if (!existingProperty) {
            return res.status(404).json({ message: "Property not found in database." });
          }
    
          await propertyRepository.remove(existingProperty);
    
          console.log("🗑️ Property deleted (DB):", existingProperty);
          return res.status(200).json({ message: "Property deleted successfully", property: existingProperty });
        } else {
          // Fallback: Delete from JSON
          const propertyIndex = properties.findIndex(prop => prop.id === parseInt(id));
          if (propertyIndex === -1) {
            return res.status(404).json({ message: "Property not found in JSON." });
          }
    
          const deletedProperty = properties[propertyIndex];
          properties.splice(propertyIndex, 1);
    
          const propertyFilePath = path.join(__dirname, "../data/property.json");
          fs.writeFileSync(propertyFilePath, JSON.stringify(properties, null, 2));
    
          console.log("🗑️ Property deleted (JSON):", deletedProperty);
          return res.status(200).json({ message: "Property deleted from JSON file", property: deletedProperty });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
    

      
    
}


module.exports = propertyService;