import { response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Users from "../models/user.model.js"
import { pool } from "../db.js";
import axios from "axios";
import { Cookie } from "express-session";

//----------------------------------Render Register------------------------------------//
export const renderRegister = async (req, res) => {
    res.render('register', { layout: 'main' });
}
//----------------------------------Get Register------------------------------------//
export const getRegister = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
        }
        if (password != confirmPassword) {
            return res.status(400).json({ error: 'รหัสผ่านไม่ตรงกัน' });
        }

        const oldUsers = await Users.findOne({ where: { user_email: email } })
        if (oldUsers) {
            return res.status(400).json({ error: 'พบผู้ใช้นี้ในระบบแล้วกรุณาเปลี่ยน' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            user_firstname: firstName,
            user_lastname: lastName,
            user_email: email,
            user_password: passwordHash,
            user_password1: passwordHash,
        })

        // Create Token
        const token = jwt.sign({
            user_id: newUser.user_id, email
        },
            process.env.TOKEN_KEY, {
            expiresIn: "2h"
        }
        )
        newUser.token = token;
        res.status(201).json({ message: "สมัครสมาชิกเรียบร้อยแล้ว", status: 201 })
    } catch (error) {
        res.status(401).json({ message: error, status: 401 });
    }
}

//----------------------------------Render Login------------------------------------//
export const renderLogin = async (req, res) => {
    res.render('login', { layout: 'main' });
}

//----------------------------------Get Register------------------------------------//
export const getLogin = async (req, res) => {
    const { username, password } = req.body;
    const loginUrl = 'http://tablet.sia.co.th/login';

    const credentials = {
        username: username,
        password: password,
    };

    try {
        const response = await axios.post(loginUrl, credentials);
        if (response.data.success === true) {
            const cookies = response.headers['set-cookie'];
            const userData = response.data.result.data;
            const { user_id, user_name, sign_token } = userData;
            const token = jwt.sign({
                user_id: user_id,
                user_name
            }, process.env.TOKEN_KEY, {
                expiresIn: '10h'
            });
            
            jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) {
                    throw new Error('Invalid token');
                }
            });
            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true,
            });
            req.session.userId = user_id;
            req.session.user = {
                id: user_id,
                firstname: user_name,
            }
            res.status(201).json({ message: 'เข้าสู่ระบบสำเร็จ', status: 201 });
        }else{
            res.status(400).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ', status: 400 });
        }
    } catch (error) {
        res.status(400).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ', status: 400 });
    }
}