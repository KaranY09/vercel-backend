import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins =['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials : true}));

//API Endpoints
app.get('/',(req, res) => res.send("API Working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// app.listen(port, ()=> console.log(`Server started on PORT: ${port}`));

let isConnected = false;    

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}  

//add middleware
app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
    next();
})  

export default app;