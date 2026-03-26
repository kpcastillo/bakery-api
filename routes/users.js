const { Router } = require('express');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

const { userValidationRules, validateUser } = require('../middleware/validator');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', userValidationRules(), validateUser, createUser);
router.put('/:id', userValidationRules(), validateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;