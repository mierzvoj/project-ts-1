const clientNameProdName = require('../service/clientNameProdName')
import { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { ClientOrder } from "../model/clientorder";

module.exports = function (app: Application) {
    app.get('/orders/:id', async (req: Request, res: Response) => {
        let data: ClientOrder[];

        try {
            data = await clientNameProdName.getClientNameProdName(req.params.id);
        } catch (e) {
            console.error(e);
        }
        res.render("list-names", { names: data });
    }
    )
}