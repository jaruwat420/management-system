import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import XLSX from "xlsx";
import moment from "moment";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
    renderHome,
    renderManagement,
    getManagement,
    UpdateManagement,
    renderDeposit,
    getCreate,
    getDataTable,
    updateDeposit,
    ajax_search_managements,
    Get_History_Log,
    getLogHistory,
    ajax_deposit_search,
    ajax_deposit_history,
    get_deposit_history,
    get_report,
    get_datatable_report,
    exportExcel

} from "../controllers/dashboardController.js";

import auth from "../middleware/auth.js"
import MasterData from "../models/masterdata.model.js";
import LogHistory from "../models/system_log_history.modal.js";
const router = Router();

const uploadXLSX = async (req, res, next) => {
try {
    //session login
    const userFirstName = req.session.user.firstname;
    const userId = req.session.user.id;

    const path = req.file.path;
    const fileName = path;
    const sheetIndexes = [3, 4];

    function readSheet(sheetIndex) {
        const workbook = XLSX.readFile(fileName, {
            type: 'binary',
            cellDates: true,
            dateNF: 'DD/MM/YYYY',
            cellNF: false,
            cellText: true,
        });

        const sheetName = workbook.SheetNames[sheetIndex];
        const sheet = workbook.Sheets[sheetName];

        const options = {
            raw: false,
            dateNF: 'DD/MM/YYYY'
        };

        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1, ...options});
        return sheetData;
    }

    const sheetData = sheetIndexes.map(sheetIndex => {
        const data = readSheet(sheetIndex);
        const header = data[0];
        const body = data.slice(1);
    
        const noColumnIndex = header.indexOf('No.');
    
        const filteredBody = body.filter(row => {
            return !(row[noColumnIndex] === '' || row[noColumnIndex] === null || row[noColumnIndex] === undefined);
        });
    
        return { sheetIndex, header, body: filteredBody };
    });

    for (const sheet of sheetData) {
        console.log(`Processing Sheet Index: ${sheet.sheetIndex}`);
        console.log('Header:', sheet.header);
        console.log('Body:', sheet.body);
        console.log('-----------------------------');

        const rowData = sheet.body.map((row) =>
            sheet.header.reduce((acc, header, index) => {
                if (header === 'DATE') {
                    acc[header] = moment(row[index], 'DD/MM/YYYY');
                } else {
                    acc[header] = row[index];
                }
                return acc;
            }, {})
        );

        for (const data of rowData) {
            //console.log('Processing data:', data);
            try {
                //format Date
                const formattedDate = moment(data.DATE, 'MM/DD/YYYY').format('DD/MM/YYYY');
                console.log(formattedDate);
                let savedData = await MasterData.create({
                    finance: data.FN,
                    tax_invoice: data['Tax Invoice'],
                    code: data.Code,
                    contact_number: data['Contract Num'],
                    brand: data['ยี่ห้อ'],
                    model: data['รุ่น'],
                    tank_code: data['รหัสถัง'],
                    engine_code: data['รหัสเครื่อง'],
                    color: data['สี'],
                    year: data['ปี'],
                    mile: data['ไมล์'],
                    license: data['ทะเบียน'],
                    province: data['จังหวัด'],
                    grade: data.Grade,
                    no_auc: data['No.Auc'],
                    no_cut: data['No Cut'],
                    good_machine: data['เครื่องดี'],
                    date: formattedDate,
                    estimate: data['ประเมิน'],
                    approved_price: data['ราคาอนุมัติ'],
                    price_end: data['จบ'],
                    price_run: data['วิ่ง'],
                    price_finish: data['ราคา\r\nแจ้งจบ'],
                    diff_price_finish: data['ส่วนต่าง\r\nแจ้ง-จบ'],
                    tax_number: data['เลขที่ผู้เสียภาษี'],
                    auction_name: data['ชื่อผู้ประมูล'],
                    address: data['ที่อยู่'],
                    telephone: data['โทร'],
                    status: data.Status,
                    entry_times: data['ครั้งที่เข้า'],
                    book: data['เล่ม'],
                    place: data.Place,
                    re_mark: data['หมายเหตุ'],
                    taxpayer_number: data['หมายเลขผู้เสียภาษี'],
                    transfer: data['ผู้รับโอน'],
                    auction_location: data['สถานที่ประมูล'],
                    description: '',
                    date_of_receiving: null,
                    date_of_sending: null,
                    date_receiving_trans: null,
                    receipt_number: '',
                    date_customer_receives: null,
                    date_sending_ems: null,
                    ems_code: '',
                    new_address: data['ที่อยู่1'],
                    history: userFirstName,
                    flag: '',
                });
                console.log(`1 row added to the database from Sheet Index: ${sheet.sheetIndex}`);
                console.log('Saved Data:', savedData.get());
            } catch (error) {
                console.error('Error inserting data:', error);
            }
        }
    }
        return res.status(201).json({ success: true, message: "นำเข้าข้อมูลสำเร็จ",status: 201 });
    } catch (err) {
        return res.status(401).json({ success: false, message: err ,status: 401});
    }
};

//const baseRoute = '/Users/caronit5/SIA/system-app/public';
const baseRoute = __dirname;
const uploadPath = path.resolve(baseRoute, '..', 'public', 'uploads');
console.log(uploadPath);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/", auth, renderHome);
router.get("/management", auth, renderManagement);
router.get("/get_management", auth, getManagement);
router.post("/api-file-upload/", upload.single("fileExcel"), uploadXLSX, (req, res) => {
    console.log(req.file);
})
router.put("/update", auth, UpdateManagement);
router.get("/deposit_transfer", auth, renderDeposit);
router.put("/create_deposit", auth, getCreate);
router.get("/get_datatable", auth, getDataTable);
router.put("/update_deposit", auth, updateDeposit);
router.post("/ajax_search_management", auth, ajax_search_managements)
router.post("/history", auth, Get_History_Log)
router.post("/get_log_history", auth, getLogHistory)
router.put("/ajax_deposit_search", auth, ajax_deposit_search)
router.post("/ajax_deposit_history", auth, ajax_deposit_history)
router.post("/get_deposit_history", auth, get_deposit_history)
router.get("/report", auth, get_report)
router.get("/get_datatable_report", auth, get_datatable_report)
router.get("/exportExcel" , auth, exportExcel)

export default router;