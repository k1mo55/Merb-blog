import  dotenv  from "dotenv";
import  express  from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"
import authRoutees from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import postRoutes from "./routes/posts.route.js"
import commentRoutes from "./routes/comment.route.js"
import path from 'path';
dotenv.config();
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

const MONGO_URL= process.env.MONGO_URL
mongoose.connect(MONGO_URL).then(()=>{
    console.log("monogo is connected")
    app.listen(3000,()=>{
        console.log("server is listening on port  "+"3000")
    })
}).catch((err)=>{
    console.log(err);
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutees);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
  
app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message = err.message ||'internal server error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

}
)
