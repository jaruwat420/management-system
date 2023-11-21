import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars"
import path from "path";
import { fileURLToPath } from 'url';
import hbs from "hbs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
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

//---------------------Session-------------------------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 180 * 60 * 1000 }
}))

app.use(function (req, res, next) {
    res.locals.sessionLogin =  req.session.userId;
    res.locals.sessionUser =  req.session.user;
    next();
});

//---------------------bodyParser-------------------------//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-------------------------Route-------------------------//
import homeRouter from "./routes/home.routes.js";
import authRouter from "./routes/auth.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
//-------------------------Route-------------------------//
app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

export default app;