import express from "express";
import bodyParser from "body-parser";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/layouts'),
]);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static("public"));


//---------------------Session-------------------------//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 180 * 60 * 1000 }
}))

app.use(function (req, res, next) {
    res.locals.sessionLogin = req.session.userId;
    res.locals.sessionUser = req.session.user;
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