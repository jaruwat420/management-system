import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars"
import path from "path";
import { fileURLToPath } from 'url';
import hbs from "hbs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//----------------------engine setup---------------------//
hbs.registerPartials(path.join(__dirname,'views/partials'))
app.engine('hbs', engine({
    defaultLayout: 'admin',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        path.join(__dirname, 'views', 'partials')
    ]
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static("public"));


import homeRouter from "./routes/home.routes.js";
//-------------------------Route-------------------------//
app.use("/", homeRouter);


export default app;