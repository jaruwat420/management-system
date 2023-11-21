import { response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Users from "../models/user.model.js"
import { pool } from "../db.js";
import xlsx from "xlsx";
import multer from 'multer';
import MasterData from "../models/masterdata.model.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



//----------------------------------Render Register------------------------------------//
export const renderHome = async (req, res) => {
    res.render('dashboard', {layout: "admin"});
}

//----------------------------------render Management------------------------------------//
export const renderManagement = async(req, res) => {

    res.render('management', {layout: "admin"});
}
//----------------------------------render Management------------------------------------//
export const getManagement = async (req, res) => {
    try {
        const data = await MasterData.findAll({
            attributes: [
                'id',
                'license',
                'province',
                'tank_code',
                'brand',
                'model',
                'auction_name',
                'address',
                'new_address',
                'date_of_receiving',
                'date_of_sending',
                'date_receiving_trans',
                'flag',
                'history'
            ]
        });

        const processedData = data.map(item => {
            const dateOfReceiving = item.date_of_receiving;
            const dateOfSending = item.date_of_sending;
            const dateReceivingTrans = item.date_receiving_trans;
            const flag = item.flag;

            let html = '';

            if (dateOfReceiving || dateReceivingTrans) {
                html += '<span class="btn-sm" style="color: green;">พร้อมรับเล่มทะเบียน</span>';
            }

            if (dateOfSending) {
                html += '<span class="btn-sm" style="color: red;">รอโอนเล่มจากขนส่ง</span>';
            }

            return {
                id: item.id,
                license: item.license,
                province: item.province,
                tank_code: item.tank_code,
                brand: item.brand,
                model: item.model,
                auction_name: item.auction_name,
                address: item.address,
                new_address: item.new_address,
                date_of_receiving: item.date_of_receiving,
                date_of_sending: item.date_of_sending,
                date_receiving_trans: item.date_receiving_trans,
                flag: item.flag,
                html: html,
                history: item.history
            };
        });
        res.json({ data: processedData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const editManagement = async (req, res) => {
    const userFirstName = req.session.user.firstname;


    const {carId, name, address, newAddress, description, dateReceive, dateSending , dateReceiveTrans} = req.body
    console.log(req.body);
    const saveData = await MasterData.update({
        description: description,
        date_of_receiving: dateReceive,
        date_of_sending: dateSending,
        date_receiving_trans: dateReceiveTrans,
        new_address: newAddress,
        history: userFirstName,
    },
    {
        where:{id: carId}
    })
}

