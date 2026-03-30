const { Router } = require('express');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

const { userValidationRules, validateUser } = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', isAuthenticated, userValidationRules(), validateUser, createUser);
router.put('/:id', isAuthenticated, userValidationRules(), validateUser, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

module.exports = router;