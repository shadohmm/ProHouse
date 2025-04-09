require("reflect-metadata");
const express = require("express");
const { AppDataSource } = require("./ormconfig");
const routes = require("./routes/index");
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization' 
}));

// Routes
app.use("/api", routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error: we will use the JSON data ", error);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
