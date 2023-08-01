import express from "express"
import Connection from "./db.js"
import routes from "./routes/route.js"
import cors from "cors";

const app =  express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.use("/", routes);


const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    try {
        Connection();
        console.log("server is running at 8000")
    } catch (error) {
        console.log(error)  
    }
})