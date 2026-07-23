// Make a simple REST API simulating an authentication mechanism.

// You will have 2 endpoints:

// - POST → `/signup`
//     - You will pass a username and password
//     - Save the credentials in a `auth.json` file
// - POST → `/login`
//     - You will pass username and password again and verify the credentials
//     - If they match return `"You are logged in!"`
//     - If they don’t match return `"Wrong credentials!"`

import express from 'express'
import fs from 'fs'
import path from 'path'


const app = express();

const FILE_PATH = path.join(__dirname, 'auth.json');

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Helper function to safely read users from auth.json
const readUsersFromFile = () => {
    try {
        // If file doesn't exist yet, return an empty array
        if (!fs.existsSync(FILE_PATH)) {
            return [];
        }
        const fileData = fs.readFileSync(FILE_PATH, 'utf8');
        // Handle empty file string safely
        return fileData ? JSON.parse(fileData) : [];
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};

// Helper function to write users back to auth.json
const writeUsersToFile = (usersArray) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(usersArray, null, 2), 'utf8');
};

// =========================================================================
// 1. POST /signup -> Register a new user
// =========================================================================
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Validation: Require both fields
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const users = readUsersFromFile();

    // Check if the username is already taken
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: "Username already exists!" });
    }

    // Add new credentials to our list
    users.push({ username, password });
    writeUsersToFile(users);

    return res.status(201).json({ message: "User successfully registered!" });
});

// =========================================================================
// 2. POST /login -> Verify credentials
// =========================================================================
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const users = readUsersFromFile();

    // Look for a user that matches both the username AND password perfectly
    const matchedUser = users.find(
        user => user.username === username && user.password === password
    );

    if (matchedUser) {
        // Match found
        return res.status(200).send("You are logged in!");
    } else {
        // Wrong credentials or user does not exist
        return res.status(401).send("Wrong credentials!");
    }
});

app.listen(3006, () => {
    console.log('Auth system running on 3006');
});
