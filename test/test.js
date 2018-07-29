const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const mongoose = require('mongoose');
const Task = require('../models/task').task;
const List = require('../models/list').list;
let id;
let tid;

chai.use(chaiHttp);

describe('TodoAPI', ()=>{
    beforeEach((done)=>{
        let list = new List({
            name: "Test list name",
            description: "Test description",
            tasks: [{
                description: "Task1",
                completed: 'false'
            }]
        });

        list.save((err)=>{
            chai.request(server)
            .get('/lists')
            .then((res)=>{
                id = (res.body.data[0]._id);
                tid = (res.body.data[0].tasks[0]._id)
                done();
            })
        })
    })
    after((done)=>{
        List.collection.drop();
        Task.collection.drop();
        done();
    });

    it('should return ALL lists on /lists GET', (done)=>{
        chai.request(server)
        .get('/lists')
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.equal('success')
            res.should.be.json;
            done();
        });
    });

    it('should show a SINGLE list on /lists/<id> GET', (done)=>{
        chai.request(server)
        .get(`/lists/${id}`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.equal('success')
            res.should.be.json;
            res.body.data._id.should.equal(id)
            done();
        });
    });

    it('should return 404 when list is not found /lists/<id> GET', (done)=>{
        chai.request(server)
        .get(`/lists/111119d2e1136950ac17a7e9`)
        .end(function(err, res){
            res.should.have.status(404);
            done();
        });
    });

    it('should return 400 when given invalid list id /lists/<id> GET', (done)=>{
        chai.request(server)
        .get(`/lists/ʂ`)
        .end(function(err, res){
            res.should.have.status(400);
            done();
        });
    });


    it('should add a SINGLE list on /lists POST', (done)=>{
        chai.request(server)
        .post('/lists')
        .send({
            'name': 'Test list adding new list',
            'description': 'Testing description',
            'tasks': '[]'
        })
        .end((err,res)=>{
            res.should.have.status(201);
            res.body.should.have.property('message');
            res.body.message.should.equal('success')
            res.body.should.have.property('data');
            res.body.data.should.have.property('name')
            res.body.data.name.should.equal('Test list adding new list')
            res.should.be.json;
            done();
        })
    });

    it('should return 400 when given invalid object /lists POST', (done)=>{
        chai.request(server)
        .post('/lists')
        .send({
            'cats': 'Test list adding new list',
            'bats': 'Testing description',
            'hats': '[]'
        })
        .end((err,res)=>{
            res.should.have.status(400);
            done();
        })
    });

    it('should return 409 if list already exists /lists POST', (done)=>{
        chai.request(server)
        .post('/lists')
        .send({
            'name': 'Test list adding new list',
            'description': 'Testing description',
            'tasks': '[]'
        })
        .end((err,res)=>{
            res.should.have.status(409);
            done();
        })
    });

    it('add a new task to todoList /lists/<id>/tasks POST', (done)=>{
        chai.request(server)
        .post(`/lists/${id}/tasks`)
        .send({'description':'adding new task test', 'completed':'false'})
        .end((err,res)=>{
            res.should.have.status(201);
            res.should.be.json;
            done();
        })
    })

    it('should return 400 given invalid input /lists/<id>/tasks POST', (done)=>{
        chai.request(server)
        .post(`/lists/${id}/tasks`)
        .send({'inceptio':'adding new task caTS', 'repeated':'false'})
        .end((err,res)=>{
            res.should.have.status(400);
            done();
        })
    })

    it('should return 404 when list is not found /lists/<id>/tasks POST', (done)=>{
        chai.request(server)
        .post(`/lists/111119d2e1136950ac17a7e9/tasks`)
        .send({'description':'adding new task test', 'completed':'false'})
        .end((err,res)=>{
            res.should.have.status(404);
            done();
        })
    })

    it('should change the completed status of task /lists/<id>/tasks/<id>/complete POST', (done)=>{
        chai.request(server)
        .post(`/lists/${id}/task/${tid}/complete`)
        .send({'completed':'true'})
        .end((err,res)=>{
            res.should.have.status(201);
            res.body.data.should.have.property('completed');
            res.body.data.completed.should.equal(true);
            done();
        })
    })

    it('should return 400 when given invalid input /lists/<id>/tasks/<id>/complete POST', (done)=>{
        chai.request(server)
        .post(`/lists/${id}/task/${tid}/complete`)
        .send({'completed':'almost'})
        .end((err,res)=>{
            res.should.have.status(400);
            done();
        })
    })
})