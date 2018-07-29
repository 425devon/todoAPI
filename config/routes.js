const todoController = require('../controllers/todoController');
module.exports = (app) =>{
    app.get("/lists", todoController.allLists);

    app.get("/lists/:id", todoController.getListById);

    app.post("/lists", todoController.createList);

    app.post("/lists/:id/tasks", todoController.createTask);

    app.post('/lists/:id/task/:tid/complete', todoController.completeTask);
}