/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")  

/* ***********************
 * View Engine Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") 

/* ***********************
 * Routes
 *************************/
app.use(static)

/* ***********************
 * Index Route
 *************************/
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

/* ***********************
 * Error handling middleware
 *************************/
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(err.status || 500);

  res.send(`
    <h1>Server Error</h1>
    <p><strong>${err.message}</strong></p>
    <p>${err.stack}</p>
  `);
});
 

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
