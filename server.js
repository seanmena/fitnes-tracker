const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// routes
app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});