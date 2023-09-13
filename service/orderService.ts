import { Order } from "../model/order";

const axios = require('axios');
module.exports.getOrders = async function (): Promise<Order[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders')
        return response.data
    } catch (e) {
        throw new Error("Could not get orders")
    }
}

module.exports.getOrdersAndNames = async function (): Promise<Order[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/namesorders')
        return response.data
    } catch (e) {
        throw new Error("Could not get names and orders")
    }
}
module.exports.createOrder = async function (order: Order): Promise<number> {
    try {
        const response = await axios.post('http://localhost:8080/api/orders/', order);
        return response.data;
    }
    catch (e) {
        throw new Error("Could not create Order");
    }
}
