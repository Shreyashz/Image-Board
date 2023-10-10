import { Router } from "express";
import board from "../models/imageboard.model.js";

const router = Router();
//main Routing for threadslist
router.route('/').get((req, res)=>{
    //inavalid URL no parameters found 
    board.find()
    .then(boards => res.json(boards))
    .catch(err=>res.status(400).json('Error: ' +err));
});
router.route('/topic/:topic').get((req, res)=>{
    //inavalid URL no parameters found
    const topc = req.params.topic; 
    board.find({subject: topc})
    .then(boards => res.json(boards))
    .catch(err=>res.status(400).json('Error: ' +err));
});

router.route('/add').post((req, res)=>{
    const username = req.body.username;
    // if condition for user credentials to be checked before cinfirmation
    const text = req.body.text;
    const imageLink = req.body.imageLink;
    const IP = "1.1.1.1";
    const options = req.body.options;
    const subject = req.body.subject;
    const date = Date.parse(req.body.date);
    const newBoard = new board({
        username,
        imageLink,
        text,
        date,
        IP,
        options,
        subject
    });
    newBoard.save()
    .then(()=>res.json('Board added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route("/:id").get(
    (req,res)=>
    {
        board.findById(req.params.id)
        .then(board =>{ 
            res.json(board)
        })
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route("/:id").delete(
    (req,res)=>
    {
        board.findByIdAndDelete(req.params.id)
        .then(() => res.json('Board deleted.'))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route("/update/:id").post(
    (req,res)=>
    {
        board.findById(req.params.id)
        .then(boardo => {
            boardo.username = req.body.username;
            boardo.text = req.body.text;
            boardo.options = req.body.options;
            boardo.subject = req.body.subject;
            boardo.save()
            .then(()=>res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err=> res.status(400).json('Error: '+err));
});

export default router;