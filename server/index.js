const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./router/userRoutes.js')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)

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
});