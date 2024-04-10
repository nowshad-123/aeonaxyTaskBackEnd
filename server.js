import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'


import cors from 'cors';
import connectDB from './config/db.js';
import userRoute from './Routes/userRoute.js';



const app = express();




dotenv.config();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


connectDB();

const corsOptions = {
    origin: 'https://aeonaxy-task-front-end.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};





app.use(cors(corsOptions));

app.use("/", userRoute)

const port = process.env.PORT;



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
