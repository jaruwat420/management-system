import { response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Users from "../models/user.model.js"
import { pool } from "../db.js";
import xlsx from "xlsx";
import multer from 'multer';
import MasterData from "../models/masterdata.model.js";
import Deposit from "../models/deposit-transfer.model.js";
import { Op } from "sequelize";
import LogHistory from "../models/system_log_history.modal.js";
import bodyParser from "body-parser";
import moment from "moment";
import sequelize from "sequelize";
import ExcelJS from "exceljs";



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//----------------------------------Render Register------------------------------------//
export const renderHome = async (req, res) => {
    const userFirstName = req.session.user.firstname;
    res.render('dashboard', {
        layout: "admin",
        title: "หน้าแรก",
        userFirstName:userFirstName
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

            let html = '';
            if (flag === 'R') {
                html += '<span class="btn-sm" style="color: blue ;">พร้อมส่งเล่มทะเบียน</span>';
            } else if (flag === 'S') {
                html += '<span class="btn-sm" style="color: red;">รอโอนเล่มจากขนส่ง</span>';
            } else if (flag === 'T') {
                html += '<span class="btn-sm" style="color: blue;">พร้อมส่งเล่มทะเบียน</span>';
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
                telephone: item.telephone

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

// Update Management and Save History Log
export const UpdateManagement = async (req, res) => {
    // Session Login
    const userFirstName = req.session.user.firstname;
    const userId = req.session.user.id;

    const {
        carId,
        newAddress,
        descriptions,
        dateReceive,
        dateSending,
        dateReceiveTrans,
        flag_status,
        documentNumber,
        datePost,
        postalCode,
        dateOfReceiving,
        deliveryType,
        status
    } = req.body;

    try {
        switch (status) {
            case "update":
                //check null 
                const sanitizedDateReceive = dateReceive || null;
                const sanitizedDateSending = dateSending || null;
                const sanitizedDateReceiveTrans = dateReceiveTrans || null;
                const sanitizedDatePost = datePost || null;
                const sanitizedDateOfReceiving = dateOfReceiving || null;
                console.log(sanitizedDateOfReceiving);

                // find old Data
                const find_old_data = await MasterData.findAll({
                    attributes: [
                        'date_of_receiving',
                        'date_of_sending',
                        'date_receiving_trans',
                        'delivery_type',
                        'receipt_number',
                        'date_customer_receives',
                        'ems_code',
                        'date_sending_ems',
                        'address',
                        'history',
                        'flag',
                        'description',
                        'id'

                    ],
                    where: { id: carId }
                });

                await Promise.all(find_old_data.map(async (data) => {
                    const {
                        date_of_receiving,
                        date_of_sending,
                        date_receiving_trans,
                        delivery_type,
                        receipt_number,
                        date_customer_receives,
                        ems_code,
                        date_sending_ems,
                        address,
                        history,
                        flags,
                        id,
                        description
                    } = data.toJSON();

                    // Create Log History
                    const update_history = await LogHistory.create({
                        user_id: userId,
                        item_id: id,
                        user_old_name: history,
                        user_new_name: userFirstName,
                        action_type: "แก้ไข",
                        item_type: "เล่มทะเบียน",
                        change_data: JSON.stringify({
                            วันที่รับเล่มทะเบียนเก่า: date_of_receiving,
                            วันที่รับเล่มทะเบียนใหม่: sanitizedDateReceive,
                            วันที่ส่งโอนเก่า: date_of_sending,
                            วันที่ส่งโอนใหม่: sanitizedDateSending,
                            วันที่รับโอนจากขนส่งเก่า: date_receiving_trans,
                            วันที่รับโอนจากขนส่งใหม่: sanitizedDateReceiveTrans,
                            ประเภทการส่งเก่า: delivery_type,
                            ประเภทการส่งใหม่: deliveryType,
                            เลขที่เอกสารเก่า: receipt_number,
                            เลขที่เอกสารใหม่: documentNumber,
                            หมายเลขพัสดุเก่า: ems_code,
                            หมายเลขพัสดุใหม่: postalCode,
                            วันที่ส่งเล่มเอกสารเก่า: date_sending_ems,
                            วันที่ส่งเล่มเอกสารใหม่: dateOfReceiving,
                            ที่อยู่เก่า: address,
                            ที่อยู่ใหม่: newAddress,
                            หมายเหตุเก่า: description,
                            หมายเหตุใหม่: descriptions,
                            สถานะเก่า: flags,
                            สถานะใหม่: flag_status,
                            แก้ไขโดย: userFirstName,
                            วันที่สร้าง: Date(),
                        })
                    });
                }));

                // Update
                if (find_old_data.length > 0) {
                    const {
                        date_of_receiving,
                        date_of_sending,
                        date_receiving_trans,
                        delivery_type,
                        receipt_number,
                        date_customer_receives,
                        ems_code,
                        date_sending_ems,
                        address,
                        history,
                        flag,
                        description
                    } = find_old_data[0].toJSON();

                    const saveData = await MasterData.update({
                        description: descriptions,
                        date_of_receiving: sanitizedDateReceive,
                        date_of_sending: sanitizedDateSending,
                        date_receiving_trans: sanitizedDateReceiveTrans,
                        new_address: newAddress,
                        history: userFirstName,
                        flag: flag_status,
                        receipt_number: documentNumber,
                        date_customer_receives: sanitizedDatePost,
                        date_sending_ems: sanitizedDateOfReceiving,
                        ems_code: postalCode,
                        delivery_type: deliveryType,
                    }, {
                        where: {
                            id: carId
                        }
                    });
                }
                break;
            default:
                break;
        }
        res.status(201).send({ message: "แก้ไขข้อมูลสำเร็จ", status: 201 });
    } catch (error) {
        res.status(400).send({ message: error, status: 400 });
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

    const { Car_License } = req.body;
    console.log(Car_License);
    // const data = await Deposit.findAll();
    // res.json({
    //     data: data
    // });
}

//-------------------------------Create deposit-----------------------------------//
export const getCreate = async (req, res) => {
    const userFirstName = req.session.user.firstname;
    const userId = req.session.user.id;

    const {
        selectedType,
        fullDate,
        fullName,
        depositBook,
        engineNumber,
        car_colors,
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
        flag_status
    } = req.body

    try {
        // Create Deposit 
        const saveData = await Deposit.create({
            type: selectedType,
            date: fullDate,
            fullname: fullName,
            transfer_name: depositBook,
            engine_number: engineNumber,
            color: car_colors,
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
            flag_status: flag_status
        })

        // create log history
        const createLogHistory = await LogHistory.create({
            user_id: userId,
            deposit_id: '',
            user_old_name: userFirstName,
            user_new_name: userFirstName,
            action_type: "เพิ่มข้อมูล",
            item_type: "ฝากโอน",
            change_data: JSON.stringify({
                ประเภท: selectedType,
                วันเดือนปี: fullDate,
                ชื่อนามสกุล: fullName,
                โอนคัดเล่มชื่อ: depositBook,
                เลขเครื่อง: engineNumber,
                สี: car_colors,
                ทะเบียน: carLicense,
                จังหวัด: province,
                โอนเข้า: transferIn,
                ราคาค่าโอน: transferPrice,
                รับเล่มSIK: receiveBook,
                ส่งตัวแทน: sendAgent,
                ตัวแทนส่งคืน: returnAgent,
                CUรับเล่ม: receive_book_cu,
                ลูกค้ารับเล่ม: date_customer_receive_book,
                ที่อยู่EMS: address_ems,
                วันที่ส่งEMS: date_send_ems,
                ที่อยู่: address,
                หมายเหตุ: re_mark,
                สถานะ: flag_status
            }),
        })
        res.status(201).send({ message: "เพิ่มข้อมูลสำเร็จ", status: 201 });
    } catch (error) {
        res.status(400).send({ message: error, status: 400 });
    }
}

//!------------------------------------------- Update Deposit-----------------------------------------//
export const updateDeposit = async (req, res) => {
    // Session Login
    const userFirstName = req.session.user.firstname;
    const userId = req.session.user.id;
    const {
        Ids,
        types,
        dates,
        fullnames,
        transfer_names,
        engine_numbers,
        colors,
        licenses,
        provinces,
        transfer_ins,
        transfer_prices,
        receive_book_siks,
        send_agents,
        return_agents,
        receive_book_cus,
        date_customer_receives,
        address_emss,
        date_send_emss,
        addresss,
        re_marks,
        flag_status
    } = req.body

    try {
        // Search Old Data
        const findOldData = await Deposit.findAll({
            attributes: [
                'id',
                'type',
                'date',
                'fullname',
                'transfer_name',
                'engine_number',
                'color',
                'license',
                'province',
                'transfer_in',
                'transfer_price',
                'receive_book_sik',
                'send_agent',
                'return_agent',
                'receive_book_cu',
                'date_customer_receive',
                'address_ems',
                'date_send_ems',
                'flag_status',
                're_mark',
                'address',
            ],
            where: { id: Ids }
        });


        await Promise.all(findOldData.map(async (data) => {
            const {
                id,
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
                flag_status,
                re_mark,
                address,
            } = data.toJSON();
            // Clear Log History
            const createLogHistory = await LogHistory.create({
                user_id: userId,
                deposit_id: Ids,
                user_old_name: userFirstName,
                user_new_name: userFirstName,
                action_type: "แก้ไข",
                item_type: "ฝากโอน",
                change_data: JSON.stringify({
                    ประเภทเก่า: type,
                    ประเภทใหม่: types,
                    วันที่เก่า: date,
                    วันที่ใหม่: dates,
                    ชื่อเก่า: fullname,
                    ชื่อใหม่: fullnames,
                    ชื่อคัดโอนเล่มเก่า: transfer_name,
                    ชื่อคัดโอนเล่มใหม่: transfer_names,
                    เลขเครื่องเก่า: engine_number,
                    เลขเครื่องใหม่: engine_numbers,
                    สีเก่า: color,
                    สีใหม่: colors,
                    ทะเบียนเก่า: license,
                    ทะเบียนใหม่: licenses,
                    จังหวัดเก่า: province,
                    จังหวัดใหม่: provinces,
                    โอนเข่้าเก่า: transfer_in,
                    โอนเข่้าใหม่: transfer_ins,
                    ราคาค่าโอนเก่า: transfer_price,
                    ราคาค่าโอนใหม่: transfer_prices,
                    รับเล่มSIKเก่า: receive_book_sik,
                    รับเล่มSIKใหม่: receive_book_siks,
                    ส่งตัวแทนเก่า: send_agent,
                    ส่งตัวแทนใหม่: send_agents,
                    ตัวแทนส่งคืนเก่า: return_agent,
                    ตัวแทนส่งคืนใหม่: return_agents,
                    CUรับเล่มเก่า: receive_book_cu,
                    CUรับเล่มใหม่: receive_book_cus,
                    ลูกค้ารับเล่มเก่า: date_customer_receive,
                    ลูกค้ารับเล่มใหม่: date_customer_receives,
                    ที่อยู่EMSเก่า: address_ems,
                    ที่อยู่EMSใหม่: address_emss,
                    วันที่ส่งEMSเก่า: date_send_ems,
                    วันที่ส่งEMSใหม่: date_send_emss,
                    ที่อยู่เก่า: address,
                    ที่อยู่ใหม่: addresss,
                    หมายเหตุเก่า: re_mark,
                    หมายเหตุใหม่: re_marks,
                })
            });
        }
        ))
        const updateData = await Deposit.update({
            type: types,
            date: dates,
            fullname: fullnames,
            transfer_name: transfer_names,
            engine_number: engine_numbers,
            color: colors,
            license: licenses,
            province: provinces,
            transfer_in: transfer_ins,
            transfer_price: transfer_prices,
            receive_book_sik: receive_book_siks,
            send_agent: send_agents,
            return_agent: return_agents,
            receive_book_cu: receive_book_cus,
            date_customer_receive: date_customer_receives,
            address_ems: address_emss,
            date_send_ems: date_send_emss,
            address: addresss,
            re_mark: re_marks,
            flag_status: flag_status
        }, {
            where: {
                id: Ids
            }
        });

        res.status(201).send({
            message: "อัพเดทข้อมูลสำเร็จ",
            status: 201
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            message: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล",
            status: 400
        });
    }
};


//------------------------------Search Car Book-------------------------------------------//
export const ajax_search_managements = async (req, res) => {
    //console.log(req.body);
    const {
        Date_Receive,
        Date_Send_Trans,
        Date_Receive_Trans_Start,
        Car_License,
        Auction_Name,
        Auction_Round,
        Code_Finance,
        Auction_Location,
        Filter_Mode,
    } = req.body;

    const [startDateReceive, endDateReceive] = Date_Receive.split(' - ');
    const [startDateSendTrans, endDateSendTrans] = Date_Send_Trans.split(' - ');
    const [startDateReceiveTrans, endDateReceiveTrans] = Date_Receive_Trans_Start.split(' - ');
    try {

        const searchResults = { searchResults: [] };

        // filter  == 0 All || ==1 condition
        if (Filter_Mode == 0) {
            const searchDepositAll = await MasterData.findAll({});
            searchResults.searchResults = searchDepositAll;
        }

        if (startDateReceive && endDateReceive) {
            const formattedStartDateReceive = moment(startDateReceive, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const formattedEndDateReceive = moment(endDateReceive, 'MM/DD/YYYY').format('YYYY-MM-DD');

            const searchDateReive = await MasterData.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(date_of_receiving) BETWEEN '${formattedStartDateReceive}' AND '${formattedEndDateReceive}'`),
                    ],
                },
            });
            searchResults.searchResults = searchDateReive;
        }
        if (startDateSendTrans && endDateSendTrans) {
            const formattedStartDateSendTrans = moment(startDateSendTrans, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const formattedEndDateSendTrans = moment(endDateSendTrans, 'MM/DD/YYYY').format('YYYY-MM-DD');

            const searchDateReceiveSendTrans = await MasterData.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(date_of_sending) BETWEEN '${formattedStartDateSendTrans}' AND '${formattedEndDateSendTrans}'`),
                    ]
                }
            });
            searchResults.searchResults = searchDateReceiveSendTrans;
        }

        if (startDateReceiveTrans && endDateReceiveTrans) {
            // แปลงวันที่จาก MM/DD/YYYY เป็น YYYY-MM-DD HH:mm:ss
            const formattedStartDateSendTrans = moment(startDateReceiveTrans, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');
            const formattedEndDateSendTrans = moment(endDateReceiveTrans, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');

            const searchDateReceiveSendTrans = await MasterData.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(date_receiving_trans) BETWEEN '${formattedStartDateSendTrans}' AND '${formattedEndDateSendTrans}'`),
                    ]
                }
            });
            searchResults.searchResults = searchDateReceiveSendTrans;
        }


        if (Car_License) {
            const searchCarLicense = await MasterData.findAll({
                where: {
                    license: {
                        [Op.like]: `%${Car_License}%`
                    }
                }
            });
            searchResults.searchResults = searchCarLicense;
        }

        if (Auction_Name) {
            const searchAuctionName = await MasterData.findAll({
                where: {
                    auction_name: {
                        [Op.like]: `%${Auction_Name}%`
                    }
                }
            });
            searchResults.searchResults = searchAuctionName;
        }

        if (Auction_Round) {
            const searchAuctionRound = await MasterData.findAll({
                where: {
                    entry_times: {
                        [Op.like]: `%${Auction_Round}%`
                    }
                },
            });
            searchResults.searchResults = searchAuctionRound;
        }

        if (Code_Finance) {
            const searchFinanceCode = await MasterData.findAll({
                where: {
                    finance: {
                        [Op.like]: `%${Code_Finance}%`
                    }
                },
            });
            searchResults.searchResults = searchFinanceCode;
        }
        if (Auction_Location) {
            const searchAuctionLocation = await MasterData.findAll({
                where: {
                    auction_location: {
                        [Op.like]: `%${Auction_Location}%`
                    }
                },
            });
            searchResults.searchResults = searchAuctionLocation;
        }
        res.status(201).json({ res: searchResults, message: "ค้นหาสำเร็จ", status: 201 });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error, status: 400 });
    }
}

// ------------------------------Get History Log-----------------------------------//
export const Get_History_Log = async (req, res) => {
    const DataId = req.body.DataId;
    const Data = await LogHistory.findAll({ where: { item_id: DataId } });
    res.status(201).json({ data: Data, message: "Success", status: 201 });
}

// ------------------------------Ajax Deposit Search-----------------------------------//
export const getLogHistory = async (req, res) => {
    try {
        const DataId = req.body.DataId
        const Data = await LogHistory.findAll({ where: { id: DataId } });

        // แปลงรูปแบบวันที่ทุกคอลัมน์
        const formattedData = Data.map(item => {
            const formattedItem = {};
            Object.keys(item.dataValues).forEach(key => {
                if (item[key] instanceof Date) {
                    formattedItem[key] = moment(item[key]).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    formattedItem[key] = item[key];
                }
            });
            return formattedItem;
        });

        res.status(201).json({ Data: formattedData, message: "success", status: 201 });
    } catch (error) {
        // ถ้ามีข้อผิดพลาด
        console.error("Error fetching log history:", error);
        res.status(500).json({ message: "Internal Server Error", status: 500 });
    }

}

// ------------------------------Ajax Deposit Search----------------------------------- *//
export const ajax_deposit_search = async (req, res) => {
    const
        {
            Date_Of_Year,
            Date_Send_Agent,
            Date_Agent_Return,
            Date_Customer_Receive,
            Car_License,
            Customer_Name,
            Engine_Number,
            Filter_Mode
        } = req.body

    // Format Date Start and End
    const [startDateOfYear, endDateOfYear] = Date_Of_Year.split(' - ');
    const [startDateSendAgent, endDateSendAgent] = Date_Send_Agent.split(' - ');
    const [startDateAgentReturn, endDateAgentReturn] = Date_Agent_Return.split(' - ');
    const [startDateCustomerReceive, endDateCustomerReceive] = Date_Customer_Receive.split(' - ');

    try {
        // filter_mode = 0 ALl|| filter_mode = 1 Condition
        //const searchResults = {};
        const searchResults = { searchResults: [] };
        if (Filter_Mode == 0) {
            const search_all = await Deposit.findAll({})
            searchResults.searchResults = search_all;
        }

        if (startDateOfYear && endDateOfYear) {
            const formattedStartDateOfYear = moment(startDateOfYear, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const formattedEndDateOfYear = moment(endDateOfYear, 'MM/DD/YYYY').format('YYYY-MM-DD');

            const searchDateOfYear = await Deposit.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(date) BETWEEN '${formattedStartDateOfYear}' AND '${formattedEndDateOfYear}'`),
                    ],
                },
            });
            searchResults.searchResults = searchDateOfYear;
        }
        if (startDateSendAgent && endDateSendAgent) {
            const formattedStartDateSendAgent = moment(startDateSendAgent, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const formattedEndDateSendAgent = moment(endDateSendAgent, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const searchDateSendAgent = await Deposit.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(send_agent) BETWEEN '${formattedStartDateSendAgent}' AND '${formattedEndDateSendAgent}'`),
                    ],
                },
            });
            searchResults.searchResults = searchDateSendAgent;
        }

        if (startDateAgentReturn && endDateAgentReturn) {
            const formattedStartDateAgentReturn = moment(startDateAgentReturn, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const formattedEndDateAgentReturn = moment(endDateAgentReturn, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const searchAgentReturn = await Deposit.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(return_agent) BETWEEN '${formattedStartDateAgentReturn}' AND '${formattedEndDateAgentReturn}'`),
                    ],
                },
            });
            searchResults.searchResults = searchAgentReturn;
        }

        if (startDateCustomerReceive && endDateCustomerReceive) {
            const formattedStartDateCustomerReceive = moment(startDateCustomerReceive, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const formattedEndDateCustomerReceive = moment(endDateCustomerReceive, 'MM/DD/YYYY').format('YYYY-MM-DD');
            const searchDateCustomerReceive = await Deposit.findAll({
                where: {
                    [Op.and]: [
                        sequelize.literal(`DATE(date_customer_receive) BETWEEN '${formattedStartDateCustomerReceive}' AND '${formattedEndDateCustomerReceive}'`),
                    ],
                },
            });
            searchResults.searchResults = searchDateCustomerReceive;
        }
        // License
        if (Car_License) {
            const searchCarLicense = await Deposit.findAll({
                where: {
                    license: {
                        [Op.like]: `%${Car_License}%`
                    }
                }
            });
            searchResults.searchResults = searchCarLicense;
        }

        //customer name
        if (Customer_Name) {
            const searchCustomerName = await Deposit.findAll({
                where: {
                    fullname: {
                        [Op.like]: `%${Customer_Name}%`
                    }
                }
            });
            searchResults.searchResults = searchCustomerName;
        }
        //Engine Number
        if (Engine_Number) {
            const searchEngineNumber = await Deposit.findAll({
                where: {
                    engine_number: {
                        [Op.like]: `%${Engine_Number}%`
                    }
                }
            });
            searchResults.searchResults = searchEngineNumber;
        }
        res.status(201).json({ res: searchResults, message: "ค้นหาสำเร็จ", status: 201 });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

//---------------------------Get Log history Deposit -----------------------------------//
export const ajax_deposit_history = async (req, res) => {
    const DataId = req.body.DataId;

    try {
        const searchLogHistory = await LogHistory.findAll({ where: { deposit_id: DataId } });
        res.status(201).json({ data: searchLogHistory })
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//---------------------------Get Log history Deposit -----------------------------------//
export const get_deposit_history = async (req, res) => {
    const DataId = req.body.DataId
    const Data = await LogHistory.findAll({ where: { id: DataId } });
    res.status(201).json({ Data: Data, message: "success", status: 201 });
}

//---------------------------Report-----------------------------------//
export const get_report = async (req, res) => {
    res.render('report', {
        layout: "admin",
        title: "รายงานเล่มทะเบียน"
    });
}


//---------------------------Get DataTable Report-----------------------------------//
export const get_datatable_report = async (req, res) => {

    try {
        const records = await MasterData.findAll({});

        for (const record of records) {
            const recordDate = moment(record.date, 'DD/MM/YYYY', true).toDate();

            if (isNaN(recordDate.getTime())) {
                continue;
            }

            const recordDates = moment(new Date(recordDate));
            const newDateFormat = moment(new Date()).add(543, 'years');
            const diffTime = Math.abs(newDateFormat - recordDates);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log('วันที่จบ (recordDates):', recordDates.format('DD/MM/YY'));
            console.log('ปัจจุบัน (newDateFormat):', newDateFormat.format('DD/MM/YY'));
            console.log('ห่างกัน (daysDiff):', diffDays);
            if (diffDays) {
                record.over_thirty_days = diffDays - 1;
            }
            await record.save();
        }


        const resultDate = await MasterData.findAll({
            where: {
                over_thirty_days: {
                    [sequelize.Op.gte]: 30
                },
                flag: {
                    [sequelize.Op.eq]: ''
                }
            }
        });


        res.status(201).json({ res: resultDate, message: 'Flag updated successfully.', status: 201 });
    } catch (error) {
        console.error('Error updating flag:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//---------------------------Export Excel-----------------------------------//
export const exportExcel = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const sheetCar = workbook.addWorksheet('รถยนต์');
        const sheetBike = workbook.addWorksheet('มอเตอร์ไซค์');

        const dataTable = await getSampleDataTable();

        fillSheet(sheetCar, dataTable, 'C');
        fillSheet(sheetBike, dataTable, 'M');

        const buffer = await workbook.xlsx.writeBuffer();
        //console.log(buffer);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
        res.send(buffer);

    } catch (error) {
        console.error('Error exporting Excel:', error);
        res.status(500).send('Internal Server Error');
    }

    async function getSampleDataTable() {
        const queryData = await MasterData.findAll({
            attributes: [
                'finance',
                'brand',
                'model',
                'engine_code',
                'color',
                'license',
                'province',
                'auction_name',
                'date',
                'description',
                'no_cut',
            ],
            where: {
                [sequelize.Op.and]: [
                    {
                        over_thirty_days: {
                            [sequelize.Op.gte]: 30
                        }
                    },
                    {
                        flag: {
                            [sequelize.Op.eq]: ''
                        }
                    }
                ]
            }
        });

        let order = 1;
        const dataTable = queryData.map(item => {
            const itemDate = (item.date);
            if ((itemDate)) {
                const currentDate = moment(new Date()).add(543, 'years');
                const momentItemDate = moment(itemDate, 'DD/MM/YYYY');
                const diffTime = Math.abs(currentDate - momentItemDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const dateReduce = diffDays - 1;
                // console.log('วันที่จบ (recordDates):', momentItemDate.format('DD/MM/YYYY'));
                // console.log('ปัจจุบัน (newDateFormat):', currentDate.format('DD/MM/YYYY'));
                // console.log('ห่างกัน (diffTime):', diffTime);
                // console.log('ห่างกัน (daysDiff):', diffDays);

                return {
                    order: order++,
                    no_cut: item.no_cut,
                    finance: item.finance,
                    brand: item.brand,
                    model: item.model,
                    engine_code: item.engine_code,
                    color: item.color,
                    license: item.license,
                    province: item.province,
                    auction_name: item.auction_name,
                    date: item.date,
                    diffDays: dateReduce,
                    description: item.description,
                };
            } else {
                return null;
            }
        }).filter(item => item !== null);
        return dataTable;
    }

    function fillSheet(sheet, dataTable, prefix) {
        // กรอก header
        sheet.addRow([
            'ลำดับ',
            'CG',
            'ยี่ห้อ',
            'รุ่น',
            'เลขครื่อง',
            'สี',
            'ทะเบียน',
            'จังหวัด',
            'ผู้ประมูล',
            'วันแจ้งจบ',
            'จำนวนวัน',
            'หมายเหตุ',
            'หมายเหตุ'
        ]);

        if (dataTable && Array.isArray(dataTable)) {
            let order = 1;
            dataTable.forEach(row => {
                if (row.no_cut[0] === prefix) {
                    sheet.addRow([
                        order++,
                        row.finance,
                        row.brand,
                        row.model,
                        row.engine_code,
                        row.color,
                        row.license,
                        row.province,
                        row.auction_name,
                        row.date,
                        row.diffDays,
                        row.description,
                    ]);
                }
            });
        } else {
            console.error('Invalid dataTable:', dataTable);
        }
    }
}