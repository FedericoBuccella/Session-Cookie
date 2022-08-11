const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://fedec123:fedec123@cluster0.sfi8r.mongodb.net/?retryWrites=true&w=majority", mongoOptions}),
            secret: "coder",
            resave: false,
            saveUninitialized: false,
            rolling: true, 
        cookie: {
            maxAge: 90000
        }
    })
)

function authMid(req, res, next) {
    if(req.session.user){
        next();
    }else{
        res.redirect("/login");
    }
}

function loginMiddleware(req, res, next){
    if(req.session.user){
        res.redirect('/');
    }else {
        next();
    }
}

app.get("/", authMid, (req, res) => {
    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get('/login', loginMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "/login.html"));
})

app.post('/process-login',(req, res)=>{
    console.log('req',req.body)
    req.session.user = req.body.username
    res.redirect('/')
})
app.get('/user-info',(req, res)=>{
  res.json({username: req.session.user})
})

app.listen(8080, () => {
    console.log("Servidor ejecutando puerto 8080")
})