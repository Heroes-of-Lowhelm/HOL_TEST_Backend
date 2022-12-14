const {request} = require("express");
module.exports = app => {
  // const tutorials = require("../controllers/tutorial.controller.js");
  const auth = require("../controllers/auth.controller")

  var router = require("express").Router();

  // // Create a new Tutorial
  // router.post("/", tutorials.create);
  //
  // // Retrieve all Tutorials
  // router.get("/", tutorials.findAll);
  //
  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);
  //
  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);
  //
  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);
  //
  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);
  //
  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  // Register user
  router.post("/register", auth.register)
  // Verify user
  router.post("/verify", auth.verifyAccount)
  // Resend code
  router.post("/resend", auth.resendCode)
  // Login user
  router.post("/login", auth.login)

  app.use('/api', router);
};
