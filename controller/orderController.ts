const orderService = require('../service/orderService');
const customerService = require('../service/customerService');
import { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { Order } from "../model/order";
import { Customer } from "../model/customer";


module.exports = function (app: Application) {
    app.get('/orders', async (req: Request, res: Response) => {
        let data: Order[];

        try {
            data = await orderService.getOrders();
        } catch (e) {
            console.error(e);
        }
        res.render("list-orders", { orders: data });
    });

    app.get('/namesorders', async (req, res) => {
        let data: Order[];

        try {
            data = await orderService.getOrdersAndNames();
        } catch (e) {
            console.error(e);
        }
        res.render("list-orders", { orders: data });
    });

    app.get('/add-order', async (req: Request, res: Response) => {
        let data: Customer[];
        try{
            
            data = await customerService.getCustomers();
 
        } catch(e){
            console.error(e);
        }
        res.render('add-order', {
            customers: data
        });
    });

    app.post('/add-order', async(req: Request, res: Response) =>{
        let data: Order = req.body;
        let id: Number;
        try{
            id = await orderService.createOrder(data);

            res.redirect('/orders/' + id);
        } catch(e){
            console.log(e);
            res.locals.errormessage = e.message;

            res.render('add-order', req.body);
        }   
    });

    app.get('/add-order-customer', async(req: Request, res: Response)=>{
        if (!req.session.order) {
            req.session.order = {};
        }
        res.render('add-order-customer');
    })
    app.post('/add-order-customer', async (req: Request, res: Response) =>{
        req.session.order["customerId"] = req.body.customerId;
        res.redirect('/add-order-date');
    })

    app.get('/add-order-date', async(req: Request, res: Response)=>{
        res.render('add-order-date');
    })

    app.post('/add-order-date', async (req: Request, res: Response) =>{
        req.session.order["orderDate"] = req.body.orderDate;
        res.redirect('/add-order-confirmation');
    })
    app.get('/add-order-confirmation', async(req: Request, res: Response)=>{
        res.render('add-order-confirmation');
    })
    app.post('/add-order-confirmation', async(req: Request, res: Response) => {
        let data: Order = req.session.order;
        let id: Number
        try{
            id = await orderService.createOrder(data);
            req.session.order = undefined;
            res.redirect('/orders/' + id);

        } catch(e){
            console.error(e);
            res.locals.errormessage = e.message;
            res.render('add-order-confirmation', req.session.order)
        }
    })












};