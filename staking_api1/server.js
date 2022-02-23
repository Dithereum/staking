const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "this is not valid call" });
});

require("./app/routes/validator.routes")(app);

const PORT = 9980;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
