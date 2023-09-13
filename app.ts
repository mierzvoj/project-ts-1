import { Request, Response } from "express";
import { Product } from "./model/product";
import { Order } from "./model/order";

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const { append } = require('express/lib/response');
const session = require('express-session');
const app = express();

const appViews = path.join(__dirname, '/views');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
}

nunjucks.configure(appViews, nunjucksConfig);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 60000}}));
declare module "express-session"{
    interface SessionData{
    product: Product,
    order: Order,
    token: string
}}


app.get('/', (reg: Request, res: Response) => {
    res.render('pizza', {
        title: 'Wojtek Pizza Time',
    });
});
require('./controller/orderController')(app);
require('./controller/productController')(app);
require('./controller/clientNameProdNameController')(app);
require("./controller/authController")(app);

app.listen(3000, ()=>{console.log('Server listening on port 3000')});
