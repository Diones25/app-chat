const { Router } = require("express")
const userController = require('../controllers/userController.js')

const router = Router();

router.post('/register', userController.register);

module.exports = router;