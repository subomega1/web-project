import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./routes/auth.route.js"


const PORT_SERVER =  process.env.PORT || 8000;
const app = express();
app.use(express.json());




dotenv.config();    

app.use("/api/auth",authRouter)

app.listen(PORT_SERVER, () => {

    connectToMongoDB()
    console.log(`Server started on port ${PORT_SERVER}`);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
})
