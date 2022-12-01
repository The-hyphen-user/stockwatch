const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
var corsOptions = { origin: "http://localhost:3000" };
const morgan = require("morgan");

const api = require("./api");
const routes = require("./routes/user");

const app = express();
app.use(morgan("dev"));

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", routes);
// app.use('/api', api)

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//     });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message,
//         },
//     });




//needs to be turned into a schedueled calls along with split chacking
//const {calculateWealth} = require("./processes/calculateWealth");//will only work once a day
//const {calculateSplits} = require("./processes/calculateSplits");


//const cal = require("./processes/calculateSplits");
//const time = require("./processes/time");


//calculateWealth();

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`✨ Server running on port ${port}!`))
