//Dependencies//
const express = require("express");
const fs = require("fs");
const shortid = require('shortid');

//Express
const app = express();

let notes = [];

// Routing
module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            // console.log(data)
             res.json(JSON.parse(data));
            notes = JSON.parse(data)
        })
    })

    app.post("/api/notes", function (req, res) {
        // fs.readFile("db/db.json", "utf8", function (err, data) {
        //     if (err) throw err;
            // const array = JSON.parse(data)
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: shortid.generate().toString(),
            };
            notes.push(newNote)
            res.json(notes)
            //console.log(newNote.id);
            fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
                if (err) throw err;
            });
                // res.json(newNote);
           
        })

    

    app.delete("/api/notes/:id", function(req, res) {

        // fs.readFile("db/db.json", "utf8", function(err, data){
        //   if(err)throw err;
        console.log(req.params.id)
    
          const array = notes;
          console.log(array);
          const newDataArray = array.filter(note => {
            return note.id !== req.params.id;
          })
          res.json(notes)
          fs.writeFile("db/db.json", JSON.stringify(newDataArray), function(err){
            if(err)throw err;
            
            console.log("Your note was deleted")
          })
        });
    }
        // res.end();
      
    
    // app.delete('/api/notes/:id', function (req, res) {
    //     const deleteID = req.params.id
    //     fs.readFile("db/db.json", "utf8", function (err, data) {
    //         if (err) throw err;
    //         const array = JSON.parse(data)
    //         const index = array.findIndex(ob => ob.id == deleteID)
    //         console.log(index)
    //         array.splice(index, 1)
    //         fs.writeFile("db/db.json", JSON.stringify(array), function (err2, data2) {
    //             if (err2) throw err2;
    //             res.json(JSON.stringify(data2));
    //         });
    //     })
    // })

