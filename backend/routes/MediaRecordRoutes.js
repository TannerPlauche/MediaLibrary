"use strict";
import express from "express";
import MediaRecord from "../models/MediaRecord";
import CampaignRecord from "../models/CampaignRecord";
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
                console.log("new media record",newMediaRecord);
                console.log("is media record",newMediaRecord instanceof MediaRecord);
                newMediaRecord.save(function(err, savedMediaRecord){
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
                    console.log("save err:", err);
                    console.log("saved record: ",savedMediaRecord);
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
        console.log(req.url);
        console.log("params",req.params);
        console.log("query",req.query);
        let request = req.query;
        console.log(request);
        let query = {};

        if (request.types && request.types.length) {
            let typesQuery = request.types.map((type)=>{
               if(type instanceof String)
               console.log({type});
                   return {type: type};
            });

            query["$or"] = typesQuery;
        }
        console.log(query);
        MediaRecord.find(query, (err, foundRecords) => {
            if (err)
                res.status(500).send({message: "There was a problem finding records with that tag", err: err});
            res.send(foundRecords);
        })
    });

// MediaRecordRoute.route("/:title")
//     .get((req, res) => {
//         console.log("title", req.params.title);
//         MediaRecord.find({'tags': {$elemMatch: {title: req.params.title}}}, (err, foundRecords) => {
//             console.log(foundRecords);
//             if (err)
//                 res.status(500).send({message: "There was a problem finding records with that tag", err: err});
//             res.send(foundRecords);
//         })
//     });

MediaRecordRoute.route("/campaign")
    .post((req, res) => {
        if (!req.body.title) {
            res.send({message: "Record is missing title. A title is required."});
        }
        console.log(req.body);

        CampaignRecord.find({title: req.body.title}, (err, foundRecord) => {
            if (err) {
                res.status(500).send(err)
            }
            else if (foundRecord.length) {
                console.log(foundRecord);
                res.send({message: "A campaign with that title already exists.", err: err});
            } else if (!foundRecord.length) {
                let newCampaign = new CampaignRecord(req.body);
                if (!newCampaign.records || !newCampaign instanceof Array) {
                    newCampaign.records = [];
                }
                console.log("new campaign", newCampaign);
                newCampaign.save(function (err, savedRecord) {
                    if (err) {
                        console.log("save err", err);

                        res.status(500).send({message: "There was a problem saving the campaign record.", err: err});
                    } else {
                        console.log("saved record", savedRecord);

                        res.send(savedRecord);
                    }
                })
            }
        })
    })
    .get((req, res)=>{
        CampaignRecord.find({},(err, foundRecords) => {
            if (err) res.status(500).send(err);
            console.log("found records",foundRecords);
            res.send(foundRecords);
        })
    });

export default MediaRecordRoute;


//Notes for tomorrow. Make endpoint that creates tags.