const mongoose = require('mongoose');
const TaskSchema = require('./task').taskSchema;
const TodoList = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tasks: [TaskSchema]
});

mongoose.model('List', TodoList);
const List = mongoose.model('List');

module.exports = {
    list: List,
    listSchema: TodoList
}