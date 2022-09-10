/* eslint-disable no-use-before-define */
// const {ServerClient, ServerClientConfig} = require('graphdb').server;
import {Response} from "express-serve-static-core";
import {Request} from "express";
import express from "express"
import os from "os"

const app = express();
app.use(express.static('dist'));
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use(express.raw());


app.get("/api/test", (req: Request, res: Response) =>{
        console.log('the server is working! api/test');
        res.send("<h1> The server is working! api/test</h1>")
    }
)