const propertyService= require("../services/propertyService")

const getAllProperties = async(req,res)=>{
    try {
        await propertyService.getAllProperties(req,res);
    } catch (error) {
        console.log(error) 
    }
};

const addProperty = async(req,res)=>{
    try {
        await propertyService.addProperty(req,res); 
    } catch (error) {
        console.log(error) 
    }
};

const editPropertyDetails = async(req,res) =>{
    try {
        await propertyService.editProperty(req,res)
    } catch (error) {
        console.log(error);   
    }
}

const deleteProperty = async(req,res) => {
    try {
        await propertyService.deleteProperty(req,res)
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = {getAllProperties,addProperty, editPropertyDetails, deleteProperty};