const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));


var user = require("./routes/user");

app.use('/nps', user)

app.listen(port, () =>{
    console.log(port);
});
