// Import Express
const express = require('express');
const app = express();

// Use dynamic port for Render deployment
const PORT = process.env.PORT || 3000;

// ===== Middleware 1: Logger =====
const loggerMiddleware = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next(); // Continue to next middleware or route
};

// Apply logger middleware globally
app.use(loggerMiddleware);

// ===== Middleware 2: Bearer Token Authentication =====
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization header missing or incorrect',
    });
  }

  const token = authHeader.split(' ')[1];
  if (token !== 'mysecrettoken') {
    return res.status(403).json({
      message: 'Invalid or missing token',
    });
  }

  next(); // Allow access to protected route
};

// ===== Homepage Route =====
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Middleware Demo</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #e0eafc, #cfdef3);
            text-align: center;
            margin: 0;
            padding: 40px;
          }
          h1 {
            color: #2a7ae2;
          }
          .container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 40px;
          }
          .card {
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 25px;
            width: 250px;
            transition: transform 0.2s;
          }
          .card:hover {
            transform: scale(1.05);
          }
          .card h3 {
            color: #2a7ae2;
          }
          .card a {
            text-decoration: none;
            background-color: #2a7ae2;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            display: inline-block;
            margin-top: 10px;
          }
          .card a:hover {
            background-color: #1b5ec8;
          }
        </style>
      </head>
      <body>
        <h1>Middleware Implementation Project 🚀</h1>
        <p>Explore the routes below to see Logging and Token Authentication in action!</p>
        <div class="container">
          <div class="card">
            <h3>Public Route</h3>
            <p>Accessible without authentication.</p>
            <a href="/public">Try Public Route →</a>
          </div>
          <div class="card">
            <h3>Protected Route</h3>
            <p>Requires Bearer token: <b>mysecrettoken</b></p>
            <a href="/protected">Try Protected Route →</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// ===== Public Route =====
app.get('/public', (req, res) => {
  res.status(200).send('✅ This is a public route. No authentication required.');
});

// ===== Protected Route =====
app.get('/protected', authMiddleware, (req, res) => {
  res
    .status(200)
    .send('🔒 You have accessed a protected route with a valid Bearer token!');
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${3000}`);
});
