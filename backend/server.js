import express from 'express';
import cors from 'cors'; 
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import tokenRouter from './routes/tokenRoute.js';

// App Config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174', 
        'https://www.thesandwichpodcast.shop',
        'https://thesandwichpodcast.shop',
        'https://sandwichpodcastwebstore-rez9.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/token', tokenRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>console.log('Server started on PORT : '+ port))