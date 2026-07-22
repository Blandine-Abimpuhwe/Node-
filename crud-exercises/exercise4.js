// Create an Express.js middleware function called `requestLogger` that logs the following information for every incoming request:

// - HTTP method (e.g., GET, POST)
// - URL path
// - Timestamp of the request
// - Response time (in milliseconds)

// Then:

// 1. Integrate this middleware into an Express app.
// 2. The app should have at least **two routes** (`/` and `/users`) that return a JSON response.
// 3. Ensure the middleware runs for **all routes** and prints logs in the following format:
    
//     ```bash
//     [2025-11-11T18:23:10Z] GET /users - 5ms
//     ```
 import express from 'express'


 const app= express()
 
// CUSTOM MIDDLEWARE: requestLogger
// =========================================================================
const requestLogger = (req, res, next) => {
    // 1. Capture the exact high-resolution start time when the request enters
    const startHrTime = process.hrtime();
    
    // 2. Generate an ISO timestamp string for the current moment
    const timestamp = new Date().toISOString();

    // 3. Listen for the 'finish' event which triggers when the response is sent
    res.on('finish', () => {
        // Calculate the elapsed time in milliseconds
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(0);

        // 4. Print the log in the exact requested format:
        // [Timestamp] METHOD Path - Xms
        console.log(`[${timestamp}] ${req.method} ${req.path} - ${elapsedTimeInMs}ms`);
    });

    // 5. CRITICAL: Pass control to the next middleware or route handler in line
    next();
};

// =========================================================================
// APPLICATION INTEGRATION & ROUTES
// =========================================================================

// 1. Apply the middleware globally so it intercepts traffic for ALL routes
app.use(requestLogger);

// 2. Route 1: Home Path '/'
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: "Welcome to the home endpoint!" 
    });
});

// 3. Route 2: Users Path '/users'
app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ]);
});

app.listen(3004, () => {
    console.log('Server is tracking logs on 3004' );
});
