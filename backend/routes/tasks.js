const express = require('express')
const {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    
     } = require('../controllers/tasks')


const router = express.Router()

router
    .route('/')
    .get(getTasks)
    .post(createTask)

router
     .route('/:id')
     .get(getTask)
     .put(updateTask)
     .delete(deleteTask)


module.exports = router