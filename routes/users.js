import express from 'express';

const router = express.Router();

// users root
router.get('/', (req, res) => {
    console.log('Getting all users...');
    res.send('Getting all users...');
});

export default router;