import { Router } from "express";
import thread from "../models/thread.model.js";
import board from "../models/imageboard.model.js";

const router = Router();

router.route('/').get((req, res)=>{
    thread.find()
    .then(thread=>res.json(thread))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res)=>{
    const username = req.body.username;
    const topic = req.body.topic;
    const date = Date.parse(req.body.date);
    const newThread = new thread({
        username,
        topic,
        date,
    });
    newThread.save()
    .then(()=>res.json('thread added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route("/:topic").get(
    (req,res)=>
    {
        const topc = req.params.topic; 
        board.find({subject: topc})
        .then(boards => res.json(boards))
        .catch(err=>res.status(400).json('Error: ' +err));
});

router.route("/:id").delete(
    (req,res)=>
    {
        thread.findByIdAndDelete(req.params.id)
        .then(() => res.json('Thread deleted.'))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route("/update/:id").post(
    (req,res)=>
    {e
        thread.findById(req.params.id)
        .then(threado => {
            threado.username = req.body.username;
            threado.text = req.body.text;
            threado.date = Date.parse(req.body.date);
            threado.save()
            .then(()=>res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err=> res.status(400).json('Error: '+err));
});

export default router;