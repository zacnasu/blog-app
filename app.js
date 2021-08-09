const AWS = require('aws-sdk')
const express = require("express");
const app = express();

AWS.config.region = process.env.REGION;

const title_table = process.env.TITLE_DATABASE_NAME;
const posts_table = process.env.POSTS_DATABASE_NAME;

const database = new AWS.DynamoDB();

app.set('view engine', 'ejs');


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/:articleName", function(req, res){
    params = {
        TableName: title_table,
        KeyConditionExpression: 'title_id = i:',
        ExpressionAttributeValues: {
            ':i': req.params.articleName
        }
    }
    database.query(params, function(err, data){
        if(err){
            res.send("failed")
        }else{
            res.send(data)
        }
    })
});

app.listen(process.env.PORT || 5000);
module.exports = app;
