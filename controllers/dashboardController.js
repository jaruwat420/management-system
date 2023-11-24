import {response} from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Users from "../models/user.model.js"
import {pool} from "../db.js";
import xlsx from "xlsx";
import multer from 'multer';
import MasterData from "../models/masterdata.model.js";
import Deposit from "../models/deposit-transfer.model.js";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

//----------------------------------Render Register------------------------------------//
export const renderHome = async (req, res) => {
    res.render('dashboard', {
        layout: "admin",
        title: "หน้าแรก"
    });
}

//----------------------------------render Management------------------------------------//
export const renderManagement = async (req, res) => {

    res.render('management', {
        layout: "admin",
        title: "จัดการเล่มทะเบียน"
    });
}
//----------------------------------render Management------------------------------------//
export const getManagement = async (req, res) => {
    try {
        const data = await MasterData.findAll({});
        const processedData = data.map(item => {
            const flag = item.flag;
            //console.log(flag);

            let html = '';
            if (flag === 'R') {
                html += '<span class="btn-sm blink" style="color: #FF6C22 ;">พร้อมส่งเล่มทะเบียน</span>';
            } else if (flag === 'S') {
                html += '<span class="btn-sm" style="color: red;">รอโอนเล่มจากขนส่ง</span>';
            } else if (flag === 'T') {
                html += '<span class="btn-sm blink" style="color: blue;">พร้อมส่งเล่มทะเบียน</span>';
            } else if (flag === 'C') {
                html += '<span class="btn-sm " style="color: green;">ส่งเล่มทะเบียนเรียบร้อยแล้ว</span>';
            } else {
                html += '<span class="btn-sm" style="color:  #FF6C22;">รอรับเล่มทะเบียน</span>';
            }

            return {
                id: item.id,
                finance: item.finance,
                tax_invoice: item.tax_invoice,
                code: item.code,
                contact_number: item.contact_number,
                license: item.license,
                province: item.province,
                tank_code: item.tank_code,
                engine_code: item.engine_code,
                color: item.color,
                year: item.year,
                mile: item.mile,
                brand: item.brand,
                model: item.model,
                grade: item.grade,
                gear: item.gear,
                no_auc: item.no_auc,
                no_cut: item.no_cut,
                date: item.date,
                good_machine: item.good_machine,
                estimate: item.estimate,
                approved_price: item.approved_price,
                price_end: item.price_end,
                price_run: item.price_run,
                price_finish: item.price_finish,
                diff_price_finish: item.diff_price_finish,
                tax_number: item.tax_number,
                auction_name: item.auction_name,
                address: item.address,
                status: item.status,
                entry_times: item.entry_times,
                place: item.place,
                re_mark: item.re_mark,
                taxpayer_number: item.taxpayer_number,
                transfer: item.transfer,
                description: item.description,
                new_address: item.new_address,
                date_of_receiving: item.date_of_receiving,
                date_of_sending: item.date_of_sending,
                date_receiving_trans: item.date_receiving_trans,
                flag: item.flag,
                html: html,
                history: item.history,
                date_customer_receives: item.date_customer_receives,
                delivery_type: item.delivery_type,
                receipt_number: item.receipt_number,
                ems_code: item.ems_code,
                date_sending_ems: item.date_sending_ems,
            };
        });
        res.json({
            data: processedData
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// Update Management
export const editManagement = async (req, res) => {
    // Session Login
    const userFirstName = req.session.user.firstname;
    const {
        carId,
        name,
        address,
        newAddress,
        description,
        dateReceive,
        dateSending,
        dateReceiveTrans,
        flag,
        documentNumber,
        datePost,
        postalCode,
        dateOfReceiving,
        deliveryType
    } = req.body;
    try {
        const saveData = await MasterData.update({
            description: description,
            date_of_receiving: dateReceive,
            date_of_sending: dateSending,
            date_receiving_trans: dateReceiveTrans,
            new_address: newAddress,
            history: userFirstName,
            flag: flag,
            receipt_number: documentNumber,
            date_customer_receives: datePost,
            date_sending_ems: dateOfReceiving,
            ems_code: postalCode,
            delivery_type: deliveryType,
        }, {
            where: {
                id: carId
            }
        })
        res.status(201).send({message: "อัพเดทข้อมูลสำเร็จ" , status: 201});
    } catch (error) {
        res.status(400).send({message: error , status: 400});
    }

}
// Render Deposit
export const renderDeposit = async (req, res) => {
    res.render('deposit', {
        layout: "admin",
        title: "ฝาก-โอน"
    });
}

// Get DataTable
export const getDataTable = async (req, res) => {
    const data = await Deposit.findAll();
    res.json({
        data: data
    });
}

//Create
export const getCreate = async (req, res) => {
    const userFirstName = req.session.user.firstname;
    const {
        selectedType,
        fullDate,
        fullName,
        depositBook,
        engineNumber,
        car_color,
        carLicense,
        province,
        transferIn,
        transferPrice,
        receiveBook,
        sendAgent,
        returnAgent,
        receive_book_cu,
        date_customer_receive_book,
        address_ems,
        date_send_ems,
        address,
        re_mark,
    } = req.body

    try {
        const saveData = await Deposit.create({
            type: selectedType,
            date: fullDate,
            fullname: fullName,
            transfer_name: depositBook,
            engine_number: engineNumber,
            color: car_color,
            license: carLicense,
            province: province,
            transfer_in: transferIn,
            transfer_price: transferPrice,
            receive_book_sik: receiveBook,
            send_agent: sendAgent,
            return_agent: returnAgent,
            receive_book_cu: receive_book_cu,
            date_customer_receive: date_customer_receive_book,
            address_ems: address_ems,
            date_send_ems: date_send_ems,
            address: address,
            re_mark: re_mark,
            edit_by: userFirstName,
        })
        res.status(201).send({message: "เพิ่มข้อมูลสำเร็จ", status: 201});
    } catch (error) {
        res.status(400).send({message: error, status: 400});
    }
}
// update
export const updateDeposit = async (req, res) => {
    const {
        Id,
        type,
        date,
        fullname,
        transfer_name,
        engine_number,
        color,
        license,
        province,
        transfer_in,
        transfer_price,
        receive_book_sik,
        send_agent,
        return_agent,
        receive_book_cu,
        date_customer_receive,
        address_ems,
        date_send_ems,
        address,
        re_mark
    } = req.body;
    try {
        const updateData = await Deposit.update({
            type: type,
            date: date,
            fullname: fullname,
            transfer_name: transfer_name,
            engine_number: engine_number,
            color: color,
            license: license,
            province: province,
            transfer_in: transfer_in,
            transfer_price: transfer_price,
            receive_book_sik: receive_book_sik,
            send_agent: send_agent,
            return_agent: return_agent,
            receive_book_cu: receive_book_cu,
            date_customer_receive: date_customer_receive,
            address_ems: address_ems,
            date_send_ems: date_send_ems,
            address: address,
            re_mark: re_mark,
        }, {
            where: {
                id: Id
            }
        });
        res.status(201).send({
            message: "อัพเดทข้อมูลสำเร็จ",
            status: 201
        });
    } catch (error) {
        res.status(400).send({
            message: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล",
            status: 400
        });
    }

}