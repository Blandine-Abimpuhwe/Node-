import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
/* You are tasked with creating a RESTful API using Node.js, Express, and MongoDB 
 to perform CRUD (Create, Read, Update, Delete) operations on a database.*/

// The API should have the following endpoints:

//GET /items Returns a list of all items in the database.
//Response status code: 200 OK.
//Response body: an array of item objects.
// If the item is not found, return 404 Not Found.

//GET /items/:id Returns the details of a specific item by ID.
// Response status code: 200 OK if the item is found,404 Not Found if not.
// Response body: a single item object.

// POST /items Creates a new item in the database.
// Request body: a JSON object representing the new item.
// Response status code: 201 Created.
// Response body: the newly created item object.

// PUT /items/:id Updates an existing item in the database.
// If the item is not found, return 404 Not Found.
// Request body: a JSON object representing the updated item.
// Response status code: 200 OK if the item is updated successfully, 404 Not Found if not.
// Response body: the updated item object.

// DELETE /items/:id Deletes an item from the database.If the item is not found, return 404 Not Found.
// Response status code: 204 No Content if the item is deleted successfully, 404 Not Found if not.
// Response body: None.Each item object should have the following properties:id: a unique identifier for the item.name: the name of the item.description: a description of the item.price: the price of the item.
// You should also implement error handling and validation for each endpoint, returning appropriate error responses when necessary.



import express from 'express'
import mongoose from 'mongoose'
import items from '../models/items.js'

const app = express()

//middleware to parse incoming JSON request bodies
app.use(express.json())

// Establish database(mongodb) connection
const dbURI= 'mongodb+srv://blandine0045_db_user:9Xbypg8lkXwytFZo@node-practice.hh8v4qs.mongodb.net/?appName=node-practice'

//connect db to mongoose
await mongoose.connect(dbURI)

//GET all items 
app.get('/items', async (req,res)=>{
    try{
        const item = await items.find();
        res.status(200).json(item)
       
    }catch(error){
        console.error('server error details:', error)
res.status(500).json({error: error.message})
    }
})



//Get items by Id
app.get('/items/:id', async(req,res)=>{
    const {id}= req.params

 //Check if the provided ID matches MongoDB's 24-character hex format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format structure' });
  }

try{
    const item = await items.findById(id)
    if(!item){
         return res.status(404).json({message:'This item is not found'})
        
    } 
    res.status(200).json(item)

}catch(error){
    console.error('server error details:', error)
    res.status(500).json({error: error.message})
}
})


//PUT by id

app.put('/items/:id', async (req,res)=>{
    const {id}= req.params
    const {title,details}= req.body
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format structure' });
    }
    try{
        const updatedItem= await items.findByIdAndUpdate(
             id, 
            { title, details }, 
            { new: true, 
              runValidators: true, 
              upsert: true //creates the item if it doesn't exist yet
                }
        )
        if(!updatedItem){
          return  res.status(404).json({message:'UpdatedItem not found'})
        }
        return res.status(200).json(updatedItem)
        
    }catch(error){
        console.error('Server error details:', error)
        return res.status(500).json({error: error.message})
    }
  
})



app.listen(3000, ()=>{
    console.log('server running on port 3000')

})

