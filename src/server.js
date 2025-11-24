import express from 'express';
import morgan from 'morgan'; //for logging
import cors from 'cors'; // for frontend-backend communication
import dotenv from 'dotenv';
import sequelize from "./models/index.js"; // Import the sequelize instance
import employeeRoutes from "./routes/employee.routes.js"; // Import employee routes
import departmentRoutes from "./routes/department.routes.js"; // Import department routes

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000;

// Create an express app
const app = express();

//use middlewares
app.use(morgan('dev'));// logs requests in terminal
app.use(cors()); // Enables API access from React or other apps
app.use(express.json()); // so backend can read JSON data from requests
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/employees", employeeRoutes); // Use employee routes
app.use("/api/departments", departmentRoutes); // Use department routes 

// Test route
app.get('/', (req, res) => {
  res.send('👌 Garment ERP backend is running!');
});

// Start the server on port 4000
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); // Test DB connection
    console.log('🐸 Database connected successfully.');
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('🐞 Unable to connect to the database:', error);
  }
});