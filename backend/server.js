"use strict";
import express from "express";
import logger from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from 'path';

import MediaRecordRoutes from "./routes/MediaRecordRoutes";

const server = express();
const port = 9000 || process.env.PORT;
// mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/SiselToolbelt", (err, database) => {
    if (err) {
        console.log("Cannot run server. There was a problem connecting to the database:", err);
    } else {
        server.listen(9000, () => {
            console.log(`Connected to ${database}. Server running on ${port}.`);
        });
    }
});

server.use(cors());
server.use(logger("dev"));
server.use('/', express.static(path.join(__dirname, '../frontend/app')));
server.use(bodyparser.json());

server.use("/media", MediaRecordRoutes);