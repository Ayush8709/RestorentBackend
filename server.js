import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import morgan from 'morgan';// it package is use to show yout url endpoint
const app = express()
const PORT =process.env.PORT || 5000;

//DataBase Connacted
import connactDb from './config/db.js';
connactDb()


//file imports 
import testRoute  from './routes/testRoutes.js'
import register from './routes/authRoutes.js'
import user from './routes/userRoutes.js'

//middleware 
// app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Routes 
app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth',register)
app.use('/api/v1/user',user)

app.get('/',(req, res)=>{
    res.status(200).send("hello server")
})

app.listen((PORT) ,()=>{
    console.log(`Server is runnin on port ${PORT}`);
})