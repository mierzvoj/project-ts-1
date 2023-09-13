const axios = require('axios');
import { ClientOrder } from "../model/clientorder";

module.exports.getClientNameProdName = async function (id: number): Promise<ClientOrder[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders/' + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get orders");
    }
}