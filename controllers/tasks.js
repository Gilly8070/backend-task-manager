const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({});
//         res.status(200).json({ tasks });
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404));
        // const error = new Error('Not Found');
        // error.status = 404;
        // return next(error);
        // return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }
    res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const body = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskId }, body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404));
        // return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }
    res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404));
        // return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }
    // res.status(200).json({ task });
    res.status(200).json({ msg: 'Task Deleted' });
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}