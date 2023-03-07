const express=require('express');
const router=express.Router();
const userController=require('../controller/usersController')

router.get('/', userController.read);
router.get('/:id', userController.readOne);
router.post('/', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);


module.exports=router;