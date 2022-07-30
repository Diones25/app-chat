import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
//app.use("/api/auth", userRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB conectado com sucesso!!!")
}).catch((err) => {
    console.log(err.message)
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando: http://localhost:${process.env.PORT}`)
})