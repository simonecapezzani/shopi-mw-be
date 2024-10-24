import express, { Request, Response } from "express";
import routes from './routes';
import path from "path";
import { config } from "./config";

const FRONTEND_PATH = config.system.frontendPath;

// Create an Express application
const app = express();
const PORT: number = 3434;


app.use(express.json());
app.use('/', routes);

// Link the default route to the React frontend
app.use(express.static(path.join(__dirname, FRONTEND_PATH )));

app.get('/',(req:Request, res:Response)=>{
    res.sendFile(path.join(__dirname, FRONTEND_PATH, 'index.html'));
});

app.use((req:Request, res:Response, next)=>{
    console.log(`${req.method} request for ${req.url}`);
    next();
});


//Listen on the specified port
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));