"use strict";
import express from "express";
import MediaRecord from "../models/MediaRecord";
import async from 'async';
import MediaTag from "../models/MediaTag";
import _ from "lodash";
const MediaRecordRoute = express.Router();

MediaRecordRoute.route("/")
    .post((req, res) => {
        console.log("req body: ", req.body);
        let options = {new: true};

        MediaRecord.findOne({title: req.body.title}, (err, foundMediaRecord) => {
            console.log("found media record", foundMediaRecord);
            if (err) {
                res.status(500).send({message: "There was a problem finding a record", err: err});
            } else if (!foundMediaRecord) {
                let newMediaRecord = new MediaRecord(req.body);
                newMediaRecord.save((err, savedMediaRecord) => {
                    if (err)
                        res.status(500).send({
                            message: "There was a problem saving the record with new record",
                            err: err
                        });
                    res.send(savedMediaRecord);
                })
            } else {
                _.assign(foundMediaRecord, req.body);
                console.log("updated Media Record", foundMediaRecord);
                foundMediaRecord.save((err, savedMediaRecord) => {
                    if (err)
                        res.status(500).send({
                            message: "There was a problem saving the record, w/ found record",
                            err: err
                        });
                    res.send(savedMediaRecord);
                });
            }
        });

    })
    .get((req, res) => {
        MediaRecord.find({'tags': {$elemMatch: {'title': req.body.title}}}, (err, foundRecords) => {
            "use strict";
            if (err)
                res.status(500).send({message: "There was a problem finding records with that tag", err: err});
            res.send(foundRecords);
        })
    });

MediaRecordRoute.route("/:title")
    .get((req, res) => {
        console.log("title", req.params.title);
        MediaRecord.find({'tags': {$elemMatch: {title: req.params.title}}}, (err, foundRecords) => {
            console.log(foundRecords);
            "use strict";
            if (err)
                res.status(500).send({message: "There was a problem finding records with that tag", err: err});
            res.send(foundRecords);
        })
    });


export default MediaRecordRoute;


//Notes for tomorrow. Make endpoint that creates tags.