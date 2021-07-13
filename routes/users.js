import express from 'express';
import { users } from '../dummy-data/users.js';

const router = express.Router();

// users root
router.get('/', (req, res) => {
    console.log('Getting all users...');
    res.send(users);
});
// single user by id
router.get('/:id', (req, res) => {
    console.log('Getting single user...');
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (user) {
        res.send(user);
        return;
    }
    res.send({ message: 'Error: User not found.' });
    
});

export default router;