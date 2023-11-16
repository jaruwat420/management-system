import { response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Users from "../models/user.model.js"
import { pool } from "../db.js";
import xlsx from "xlsx";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//----------------------------------Render Register------------------------------------//
export const renderHome = async (req, res) => {
    res.render('dashboard', {layout: "admin"});
}

//----------------------------------Get Management------------------------------------//
export const getManagement = async(req, res) => {
    res.render('management', {layout: "admin"});
}

//----------------------------------Get Management------------------------------------//
export const previewData = async (req, res, next) => {
    console.log(req.file);
    res.json({ message: 'File uploaded successfully' });
}
