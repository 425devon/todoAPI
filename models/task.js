const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    description: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false },
    created_at: {type: Date, defualt: Date.now},
    updated_at: {type: Date, defualt: Date.now},
});

mongoose.model('Task', TaskSchema);

const Task = mongoose.model('Task');

module.exports={
    task: Task,
    taskSchema: TaskSchema
}