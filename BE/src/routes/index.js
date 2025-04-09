const express = require('express');
const router = express.Router();
const propertyRoute = require("./propertyRoute");

router.get('/get-all-properties',propertyRoute.getAllProperties);
router.post('/add-new-property', propertyRoute.addProperty);
router.post('/edit-property-details/:id', propertyRoute.editPropertyDetails);
router.get('/delete-property/:id',propertyRoute.deleteProperty);

module.exports = router;