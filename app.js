const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const fileUpload = require("express-fileupload")


const index_router = require('./routes/index');
const sign_in_router = require("./routes/sign-in")
const sign_up_router = require("./routes/sign-up")
const create_shop_router = require("./routes/create/create")
const shop_router = require("./routes/shop")
const search_shop_api_router = require("./routes/API/search_shop_api")
const get_shop_data_api_router = require("./routes/API/get_shop_data")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 60 * 24 * 30
    }
}))

app.use('/', index_router);
app.use('/create', create_shop_router);
app.use('/sign-up', sign_up_router);
app.use('/sign-in', sign_in_router);
app.use("/shop",shop_router)
app.use("/api/search",search_shop_api_router)
app.use("/api/shop",get_shop_data_api_router)



console.log("http://localhost:3000/bd")
app.listen(3000);

