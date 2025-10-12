// Import Express
const express = require('express');
const app = express();
const PORT = 3000;

// ===== Middleware 1: Logger =====
const loggerMiddleware = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route
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

  next(); // Proceed to protected route
};

// ===== Public Route =====
app.get('/public', (req, res) => {
  res.status(200).send('This is a public route. No authentication required.');
});

// ===== Protected Route =====
app.get('/protected', authMiddleware, (req, res) => {
  res
    .status(200)
    .send('You have accessed a protected route with a valid Bearer token!');
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${3000}`);
});
