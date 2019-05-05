import express from 'express';

const router = express.Router();

router.post('/', (req,res) => {
    console.log('POST');
    res.send('POST: /message');
});

router.get('/', (req,res)=> {
    console.log('GET');
    res.send('GET: /message');
});

export default router; 