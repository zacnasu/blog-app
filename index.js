const AWS = require('aws-sdk')
const express = require("express");
const app = express();

AWS.config.region = "us-east-2"

const title_table = process.env.TITLE_DATABASE_NAME;
const posts_table = process.env.POSTS_DATABASE_NAME;

const database = new AWS.DynamoDB.DocumentClient();

app.set('view engine', 'ejs');


app.get("/", function(req, res) {
    res.render("pages/home");
});

app.get("/all_posts", function(req, res){
    const params = {
        TableName: title_table
    }
    database.scan(params, function(err, data){
        if(err || !data){
            res.render("pages/error");
        }else{
            res.render("pages/all_posts", {posts: data.Items})
        }
    })
})

app.get("/:articleName", function(req, res){
    const params = {
        TableName: posts_table,
        KeyConditionExpression: "#title_id = :title_id",
        ScanIndexForward: false,
        ExpressionAttributeNames: {
            "#title_id": "title_id"
        },
        ExpressionAttributeValues: {
            ":title_id": req.params.articleName
        }
    }
    database.query(params, function(err, data){
        if(err || !data || data.Items === []){
            res.render("pages/error")
        }else{
            res.render("pages/post", {post_data: data.Items[0]})
        }
    })
});

app.listen(process.env.PORT || 8080);
module.exports = app;
