import express from 'express';
import { Client } from 'pg';

const router = express.Router();

router.post('/', (req,res) => {
    const db: Client = res.app.locals.db;
    db.query(`INSERT INTO messages(message, created_on) VALUES('${req.body.message}', '${new Date().toISOString()}');`)
    .then(data => {
        res.send(`Insert ${req.body.message} into database`);
    });
});

router.get('/', (req,res)=> {
    const db: Client = res.app.locals.db;
    db.query('Select * from messages')
    .then(data => {
        res.send(data.rows)
    }).catch(err => res.send(err));
});

export default router; 