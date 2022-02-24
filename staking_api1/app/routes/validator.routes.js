module.exports = app => {
  const validators = require("../controllers/validator.controller.js");

  var router = require("express").Router();

  // Create a new validator
  // router.post("/", validators.create);

  // Update a VAlidator with id
  //router.put("/:id", validators.update);

  // count all activevalidators
  router.get("/activevalidators", validators.activevalidators);
    
  // get bonded_tokens
  router.get("/bondedtokens", validators.bondedTokens);
  
  // getAll validators
  router.get("/getValidators", validators.getAll);
  
  // getallvalidators
  router.get("/getallvalidators", validators.getAllValidators);
  
  app.use('/api/validators', router);
};

