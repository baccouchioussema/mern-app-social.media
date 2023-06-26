const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const {uploadErrors} = require("../utils/errors.utils")

module.exports.uploadProfil = async (req , res)  => {
    // console.log("req.file : " , req.file)
    // console.log("req.body : " , req.body)
     try {
        
        // if (
        //     req.file.detectedMimeType !== "image/jpg" &&
        //     req.file.detectedMimeType !== "image/png" && 
        //     req.file.detectedMimeType !== "image/jpeg" 
        // )
        // throw Error("invalid file");

        if (req.file.size > 900000)  throw Error("max size");
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture: "./uploads/profil/" + req.file.filename}},
            { new: true, upsert: true, setDefaultsOnInsert: true}
        )
     }  catch (err) {
        console.log("error ; " , err)
        return res.status(500).send({ message: err });
     }
     
};