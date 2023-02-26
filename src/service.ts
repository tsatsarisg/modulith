import express from "express"
import cors from "cors"
import dotenv from "dotenv"

const app = express()
dotenv.config();

const port = process.env.PORT_NUMBER;

app.use(express.json())
app.use(cors({}))

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
  
app.listen(port, () => {
console.log(`[server]: Server is running at http://localhost:${port}`);
});