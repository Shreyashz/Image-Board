import { Router } from "express";
import user from "../models/user.model.js";

const router = Router();

router.route('/').get((req, res)=>{
    user.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res)=>{
    const username = req.body.username;
    const newUser = new user({username});
    newUser.save()
    .then(()=>res.json('User added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

export default router;