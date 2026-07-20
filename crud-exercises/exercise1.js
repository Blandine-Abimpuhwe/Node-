
/* You are tasked with creating a RESTful API using Node.js, Express, and MongoDB 
 to perform CRUD (Create, Read, Update, Delete) operations on a database.*/

// The API should have the following endpoints:
// If the item is not found, return 404 Not Found.
// Response status code: 200 OK if the item is found,
// 404 Not Found if not.
// Response body: a single item object.

// POST /itemsCreates a new item in the database.
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