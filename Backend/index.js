import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

app.use(express.json())

// app.use(cors())

app.use(cors({
    origin: "https://book-store-crud-application.vercel.app/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));


app.get('/', (req, res) => {
    // console.log("first")
    return res.status(234).send("<html><body><h1>Hello Node</h1></body></html>")
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Database connected")   
        app.listen(PORT, () => {
            console.log(`App is listening on: ${PORT}`);
        }) 
    }).catch((err) => {
        console.log(`error ${err.message}`)
    });



