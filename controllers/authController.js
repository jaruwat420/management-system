import { response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Users from "../models/user.model.js"
import { pool } from "../db.js";

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
        res.status(201).json({message: "create user success fully."})
    } catch (error) {
        res.status(400).json(`error : ${error}`);
    }
}

//----------------------------------Render Login------------------------------------//
export const renderLogin = async (req, res) => {
    res.render('login', { layout: 'main' });
}

//----------------------------------Get Register------------------------------------//
export const getLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate
        if (!(username && password)) {
            res.status(400).json({
                message: 'โปรดกรอกข้อมูลให้ครบทุกช่อง',
                status: 400
            });
            return;
        }
        const user = await Users.findOne({ where: { user_email: username } });
        if (user && (await bcrypt.compare(password, user.user_password))) {

            // create token
            const token = jwt.sign({
                user_id: user.user_id,
                username
            },
            process.env.TOKEN_KEY, {
                expiresIn: '10h'
            });
            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true,
            });

            // Create session Users
            req.session.userId = user.user_id;
            req.session.user = {
                id: user.user_id,
                firstname: user.user_firstname
                
            }

            res.status(201).send({message: 'เข้าสู่ระบบสำเร็จ',status: 201 });
        } else {
            res.status(400).send({message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',status: 400});
        }
    } catch (error) {
        res.status(400).json(`เกิดข้อผิดพลาด : ${error}`);
    }    
}