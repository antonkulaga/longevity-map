/* eslint-disable no-use-before-define */
// const {ServerClient, ServerClientConfig} = require('graphdb').server;
import {Response} from "express-serve-static-core";
import {Request} from "express";
import express from "express"
import * as fs from 'fs';
import * as path from "node:path";
import os from "os"
import pl from 'nodejs-polars';

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

app.get("/api/longevity", (req: Request, res: Response) =>{
        console.log(__dirname)
        const folder = path.resolve("./public")
        const longevity_map: pl.DataFrame = pl.readCSV(path.resolve("./public/longevity_map.tsv"), {
            sep: "\t"
        })
        const rows = longevity_map.toRecords()
        fs.readdirSync(folder).forEach(file => {
            console.log(file);
        });
        res.send(rows)
    }
)

console.log( 'http://' + (process.env.HOST || '0.0.0.0') + ':' + (process.env.PORT || '8090'))

app.listen(process.env.PORT || 8090, () => console.log(`Listening in dev mode on port ${process.env.PORT || 8090}!`));
