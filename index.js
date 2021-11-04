const Employees = require('./functions/employee.js');
const employees = new Employees();
const Joi = require('joi');
const express = require('express');
const app = express();
const cors = require('cors');

//Enable cors
app.use(cors());

//Use middleware for request processing pipeline
app.use(express.json());

// app.get('api/employees', (req, res) => {
//     // const schema = {
//     //     name: Joi.string().min(3).required()
//     // };

//     // const result = Joi.validate(req.body, schema);
// });

app.get('/', (req,res) => res.send(`Welcome`));

//Return the list of employees
app.get('/api/employees', (req, res) => {
    try{
        //Check for the optional sortBy parameter
        if(req.query.sortBy)
            return res.send(employees.filter(req.query.sortBy));
        else
            return res.send(employees.employees);
    }
    catch({status, message}){
        return res.status(status).json(message);
    }
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));