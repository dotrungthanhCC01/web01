// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const db = require('./config/db');  // Kết nối MySQL

// Sử dụng CORS
app.use(cors());

// Để xử lý JSON body
app.use(express.json());

// Sử dụng các route để xử lý task
app.use('/api', taskRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
