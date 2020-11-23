const express = require("express");

const app = express();

const port = 8000;

app.get('/', (req, res) => {
    return res.send("Hello there")
})

app.get('/login', (req, res) => {
    return res.send("You are on login page")
})

app.get('/signin', (req, res) => {
    return res.send("You are on sign in page")
})

app.get('/singout', (req, res) => {
    return res.send("You are on signout page")
})

const admin = (req,res) => {
    return res.send("This is admin");
}

const isAdmin = (req,res,next) => {
    console.log("This is isAdmin");
    next();
};
app.get('/admin', isAdmin, admin)


app.listen(port, () => {
    console.log("Server is up and running....");
})