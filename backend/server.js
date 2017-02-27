import express from "express";
import logger from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import MediaRecordRoutes from "./routes/MediaRecordRoutes";

const server = express();
const port = 9000 || process.env.PORT;
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/SiselToolbelt");

server.use(cors());
server.use(logger("dev"));
server.use(bodyparser.json());
// server.use(multer);
// const upload = multer({dest: 'uploads/'});

server.use("/media", MediaRecordRoutes);

server.listen(9000, ()=>{
    console.log(`Server running on ${port}`);
});