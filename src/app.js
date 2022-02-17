import express from "express";
import cors from "cors";
import config from "./config";
import morgan from "morgan";
import auditRoutes from './routes/audit.routes'

const app = express()

//Configuraciones
    //Configuro el puerto
app.set('port',config.port)

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(auditRoutes)
export default app