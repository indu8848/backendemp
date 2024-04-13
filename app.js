
const express= require('express')
const morgan =require('morgan')
require('dotenv').config();
require('./DB/connection')
const PORT = process.env.PORT;
const app = express();
app.use(morgan('dev'));
app.use(express.json());
const dataModel = require('./Model/data');
app.listen(PORT,()=>{
  console.log(`${PORT} is up and running`);
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await dataModel.find();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await dataModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

// Create a new employee
app.post('/api/employeelist', async (req, res) => {
    const { name, location, position, salary } = req.body;
    try {
        const newEmployee = new dataModel({ name, location, position, salary });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});



  //TODO: delete a employee data from db by using api '/api/employeelist/:id'


// Delete an employee by ID
 app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const deletedEmployee = await dataModel.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist/:id', async (req, res) => {
    const { name, location, position, salary } = req.body;
    try {
        const updatedEmployee = await dataModel.findByIdAndUpdate(req.params.id, { name, location, position, salary }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});






//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



