const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
var corsOptions = { origin: "http://localhost:3000" };

const api = require("./api");
const routes = require("./routes/user");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", routes);
// app.use('/api', api)




//needs to be turned into a schedueled calls along with split chacking
//const {calculateWealth} = require("./processes/calculateWealth");
//const {calculateSplits} = require("./processes/calculateSplits");


//const cal = require("./processes/calculateSplits");
//const time = require("./processes/time");


//calculateWealth();

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`✨ Server running on port ${port}!`));
