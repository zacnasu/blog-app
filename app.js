const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("home")
});

// for later once database is created
// app.get("/:articleName", function(req, res){
//     req.params.articleName
// })

app.listen(process.env.PORT || 5000);
module.exports = app;