const Task = require('../models/task').task;
const List = require('../models/list').list;
const errorHandler = require('../errorHandler/handler');

module.exports={
    allLists: (req, res)=>{
        List.find({}, (err, lists)=>{
            if(err){
                res.json({message: "error", error: err});
            }else{
                res.json({message:"success", data: lists})
            }
        })
    },

    getListById: (req,res)=>{
        List.find({_id: req.params.id}, (err, list)=>{
            if(err){
                errorHandler(res, err.message).send();
            }else{
                let todoList = list[0];
                if(todoList){
                    res.json({message: "success", data: todoList});
                }else{
                    errorHandler(res,"not found").send();
                } 
            }
        })
    },

    createList: (req, res)=>{
        const list = new List({
            name: req.body.name,
            description: req.body.description,
        })

        list.save((err, list)=>{
            if(err){
                errorHandler(res, err.message).send();
            }else{
                res.status(201).json({message: "success", data: list});
            }
        })
    },

    createTask: (req,res)=>{
        List.findOne({_id: req.params.id}, (err,list)=>{
            const task = new Task({
                description: req.body.description
            });
            if(err){
                errorHandler(res, err.message).send();
            }else if(!list){
                errorHandler(res, "not found").send();
            }
            else{
                list.tasks.push(task)
                list.save((err)=>{
                    if(err){
                        errorHandler(res, err.message).send();
                    }else{
                        res.status(201).json({message: "success", data: list});
                    }
                })
            }
        })
    },

    completeTask: (req, res)=>{
        List.findOne({_id: req.params.id}, (err,list)=>{
            if(err){
                errorHandler(res, err.message).send();
            }else{
                list.tasks.id(req.params.tid).completed = req.body.completed;
                list.save((err,list)=>{
                    if(err){
                        errorHandler(res, err.message).send();
                    }else{
                        res.status(201).json({message: "success", data: list.tasks.id(req.params.tid)});
                    }
                })
            }
        })

    }
}
