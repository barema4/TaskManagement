const tasks = require('../models/Tasks')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')


exports.getTasks = asyncHandler(async (req, res, next) => {
    let query;
    let reqQuery = {...req.query}

    const removeFields = ['select','sort','page','limit']

    removeFields.forEach(param => delete reqQuery[param])

    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = tasks.find(JSON.parse(queryStr))


    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }
   
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 2
    const startIndex = (page - 1) * limit
    query = query.skip(startIndex).limit(limit)

    const endIndex = page * limit
    const total = await tasks.countDocuments()
    
        const allTasks = await query;

    let pagination = {}
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

        res.status(200).json([
            pagination,
            allTasks
        ])
})

exports.getTask = asyncHandler(async(req, res, next) => {
    
        const singleTask = await tasks.findById(req.params.id)
        if(!singleTask){
           return new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        }
        res.status(200).json({success: true, data: singleTask})
})


exports.createTask = asyncHandler(async(req, res, next) => {
    
        const task =  await tasks.create(req.body)
        res.status(201).json({
            success: true,
            data: task
        })
})

exports.updateTask = asyncHandler(async (req, res, next) => {
        const updateTask = await tasks.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        if(!updateTask){
            return new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        }
        res.status(200).json({success: true, data: updateTask}) 
})



exports.deleteTask = asyncHandler(async (req, res, next) => {
    
        const deletTask = await tasks.findByIdAndDelete(req.params.id);
       
        if(!deletTask){
            return new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        }
        res.status(200).json({success: true, data: {}})
})
