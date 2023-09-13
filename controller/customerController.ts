const customerService = require('../service/customerService');
import { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { Customer } from "../model/customer";

module.exports = function (app: Application) {
    app.get('/customers', async (req: Request, res: Response) => {
        let data: Customer[];

        try {
            data = await customerService.getCustomers();
        } catch (e) {
            console.error(e);
        }
        res.render("add-order", { customers: data });
        console.log(data);
    });
};