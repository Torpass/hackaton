import express from 'express';

const router = express.Router();

router.get('/hello', ()=>{
    console.log('Hello world from hackathon xd');
} );


module.exports = router;