import {connect} from "mongoose"
import { orderModel } from "../models/order.models.js"

const ordenes= [
    {
        name: "Margherita",
        size: "small",
        price: 8,
        quantity: 2,
        date: "2021-01-13T09:08:13Z"
    },
    {
        name: "Pepperoni",
        size: "medium",
        price: 12,
        quantity: 1,
        date: "2020-05-13T09:08:13Z"
    },
    {
        name: "Hawaiian",
        size: "medium",
        price: 16,
        quantity: 3,
        date: "2022-03-11T09:08:13Z"
    },
    {
        name: "Hawaiian",
        size: "large",
        price: 16,
        quantity: 3,
        date: "2022-03-14T09:08:13Z"
    },
    {
        name: "Margherita",
        size: "large",
        price: 16,
        quantity: 3,
        date: "2022-03-11T09:08:12Z"
    },
    {
        name: "Pepperoni",
        size: "large",
        price: 16,
        quantity: 3,
        date: "2022-03-15T09:08:13Z"
    },
    {
        name: "Pepperoni",
        size: "large",
        price: 25,
        quantity: 3,
        date: "2022-03-18T09:08:12Z"
    },
    {
        name: "Margherita",
        size: "large",
        price: 30,
        quantity: 3,
        date: "2022-03-21T09:08:12Z"
    }
]

export const connectDB = async () => {
    console.log("Base de datos conectada")
    await connect("mongodb+srv://valentinoldelgado:job45809306@cluster1.gxp6a.mongodb.net/c70125?retryWrites=true&w=majority&appName=cluster1")

    //Insertar ordenes

    let result = await orderModel.insertMany(ordenes)
    
    //console.log(result)

    //solicitar las ordenes

    const orders = await orderModel.find()

    //stages

    let ordersStages = await orderModel.aggregate([
        {
            $match: {size: "medium"}
        }, //paso 1
        {
            $group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}
        }, //paso 2
        {
            $sort: {totalQuantity: -1}
        },
        {
            $group: {_id: 1, orders: { $push: "$$ROOT" }}
        },
        {
            $project: {"_id": 0, orders: "$orders"}
        },
        {
            $merge: {into: "reports"}
        },
    ])

    console.log(ordersStages)
}