// ## Practical : 2

// ```
// Implement these endpoints: The main route will be /todo
// POST →/todo to create a task,
// GET → /todo to get all tasks
// Use a search parameter to filter tasks by status,
// Use route parameters to a task by id,
// A task will be have this shape:
// type task = {
// id: number,
// task: string,
// status: "todo" | "doing" | "done"
// }
// ```

import express from 'express'

const app= express()


// CRITICAL: Middleware to allow Express to read JSON data from req.body
app.use(express.json());


app.get('/todo/:id',(req,res)=>{

    try{
// Express route parameters are strings; parse it to a number to match our data type
        const taskId = parseInt(req.params.id);

        // Search the array for an item matching this specific numeric ID
        const foundTask = tasks.find(t => t.id === taskId);

        // Validation guard: If the item does not exist, return a 404 error
        if (!foundTask) {
            return res.status(404).json({ error: `Task with id ${taskId} not found` });
        }

        return res.json(foundTask);
    }catch(error){
        console.error("server error: ", error)
    }
})

let tasks= []
let nextId =1
app.post('/todo',(req,res)=>{
  
    try{
      const {task} = req.body
      if (!task){
        return res.status(400).json({message: "task description is required"})
      }

       // Create a new task object following the exact shape requested
        const newTask = {
            id: nextId++,       // Assign current counter value, then increment it
            task: task,
            status: "todo"      // Default initial status for any new task
        };

        // Save it to our array database
        tasks.push(newTask);

        // Return the created task with a 201 Created status code
        return res.status(201).json(newTask);
    }catch(error){
console.error('server error :', error)
return res.status(500).json({error:"internal server error"})
    }
})


app.listen(3003, ()=>console.log('server running on port 3003'))