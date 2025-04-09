const express = require('express');
const axios = require('axios');
const { log } = require('console');

const app = express();
const port = 3000;

function getIDGreate(resval) {
    req = []
    console.log(resval)
    resval.forEach(element => {
        if(element.id > 2){
            req.push(resval.name)
        }
    });
    return req;
}
// Define a route to call the external API and print the data
app.get('/fetch-users', async (req, res) => {
  try {
    // Make the GET request to the external API
    const response = await axios.get('https://fake-json-api.mock.beeceptor.com/users');
    const result = getIDGreate(response.data)
    console.log(result)
    // Log the data to the console
    console.log(response.data);

    // Send the data back to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data from the API');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
