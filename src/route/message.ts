import express from 'express';
import { EntityManager } from "typeorm";
import { Message } from '../models/message';

const router = express.Router();

router.post('/', async (req,res) => {
    const repository: EntityManager = res.app.locals.db.manager;
    const message: Message = new Message();
    message.message = req.body.message;
    message.createdOn = new Date().toISOString();
    
    await repository.save(message);
    res.send(`Insert ${req.body.message} into database`);
});

router.get('/', async (req,res)=> {
    const repository: EntityManager = res.app.locals.db.manager;
    const messages = await repository.find(Message);
    res.send(JSON.stringify(messages));
});

export default router; 