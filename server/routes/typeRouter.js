const Router = require('express');
const typeController = require('../Controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;