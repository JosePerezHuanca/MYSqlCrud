const express=require('express');
const router=express.Router();
const taskController=require('../controller/tasksController');

router.get('/',taskController.read);
router.get('/:id',taskController.readOne);
router.post('/',taskController.add);
router.put('/:id',taskController.update);
router.delete('/:id',taskController.remove);

module.exports=router;