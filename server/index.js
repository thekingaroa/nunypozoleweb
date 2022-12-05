import express from "express";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import imsRoutes from './routes/ims.routes.js'

const app = express();

app.use(express.json());
app.use(indexRoutes);
app.use(authRoutes);
app.use(imsRoutes);

app.listen(PORT);
console.log(`Serving on port ${PORT}`);
