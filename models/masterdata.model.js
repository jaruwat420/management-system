import { Sequelize,DataTypes } from 'sequelize';
import dotenv from 'dotenv'; 
dotenv.config({ path: './.env'})

// config
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;

const sequelize = new Sequelize('management-system', 'root', 'root',{
    host: '127.0.0.1',
    port: 8889,
    dialect: 'mysql',
});

const MasterData = sequelize.define('masterdata', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    finance: {
        type: DataTypes.STRING,
        field: 'finance',
        allowNull: true,
        defaultValue: '',
    },
    tax_invoice: {
        type: DataTypes.STRING,
        field: 'tax_invoice',
        allowNull: true,
        defaultValue: '',
    },
    code: {
        type: DataTypes.STRING,
        field: 'code',
        allowNull: true,
        defaultValue: '',
    },
    contact_number: {
        type: DataTypes.STRING,
        field: 'contact_number',
        allowNull: true,
        defaultValue: '',
    },
    brand: {
        type: DataTypes.STRING,
        field: 'brand',
        allowNull: true,
        defaultValue: '',
    },   
    model: {
        type: DataTypes.STRING,
        field: 'model',
        allowNull: true,
        defaultValue: '',
    },   
    tank_code: {
        type: DataTypes.STRING,
        field: 'tank_code',
        allowNull: true,
        defaultValue: '',
    },   
    engine_code: {
        type: DataTypes.STRING,
        field: 'engine_code',
        defaultValue: '',
    },   
    color: {
        type: DataTypes.STRING,
        field: 'color',
        allowNull: true,
        defaultValue: '',
    },   
    year: {
        type: DataTypes.STRING,
        field: 'year',
        allowNull: true,
        defaultValue: '',
    },   
    mile: {
        type: DataTypes.STRING,
        field: 'mile',
        allowNull: true,
        defaultValue: '',
    },   
    license: {
        type: DataTypes.STRING,
        field: 'license',
        allowNull: true,
        defaultValue: '',
    },   
    province: {
        type: DataTypes.STRING,
        field: 'province',
        allowNull: true,
        defaultValue: '',
    },   
    grade: {
        type: DataTypes.STRING,
        field: 'grade',
        allowNull: true,
        defaultValue: '',
    },   
    no_auc: {
        type: DataTypes.STRING,
        field: 'no_auc',
        defaultValue: '',
        allowNull: true,
    },   
    no_cut: {
        type: DataTypes.STRING,
        field: 'no_cut',
        defaultValue: '',
        allowNull: true,
    },   
    good_machine: {
        type: DataTypes.STRING,
        field: 'good_machine',
        defaultValue: '',
        allowNull: true,
    },   
    date: {
        type: DataTypes.STRING,
        field: 'date',
        defaultValue: null,
        allowNull: true,
    },   
    estimate: {
        type: DataTypes.STRING,
        field: 'estimate',
        defaultValue: '',
        allowNull: true,
    },   
    approved_price: {
        type: DataTypes.STRING,
        field: 'approved_price',
        defaultValue: '',
        allowNull: true,
    },   
    price_end: {
        type: DataTypes.STRING,
        field: 'price_end',
        defaultValue: '',
        allowNull: true,
    },   
    price_run: {
        type: DataTypes.STRING,
        field: 'price_run',
        defaultValue: '',
        allowNull: true,
    },   
    price_finish: {
        type: DataTypes.STRING,
        field: 'price_finish',
        defaultValue: '',
        allowNull: true,
    },   
    price_finish: {
        type: DataTypes.STRING,
        field: 'price_finish',
        defaultValue: '',
        allowNull: true,
    },   
    diff_price_finish: {
        type: DataTypes.STRING,
        field: 'diff_price_finish',
        defaultValue: '',
        allowNull: true,
    },   
    tax_number: {
        type: DataTypes.STRING,
        field: 'tax_number',
        defaultValue: '',
        allowNull: true,
    },   
    auction_name: {
        type: DataTypes.STRING,
        field: 'auction_name',
        defaultValue: '',
        allowNull: true,
    },   
    address: {
        type: DataTypes.STRING,
        field: 'address',
        defaultValue: '',
        allowNull: true,
    },   
    telephone: {
        type: DataTypes.TEXT,
        field: 'telephone',
        defaultValue: '',
        allowNull: true,
    },   
    status: {
        type: DataTypes.STRING,
        field: 'status',
        defaultValue: '',
        allowNull: true,
    },   
    entry_times: {
        type: DataTypes.STRING,
        field: 'entry_times',
        defaultValue: '',
        allowNull: true,
    },   
    book: {
        type: DataTypes.STRING,
        field: 'book',
        defaultValue: '',
    },   
    place: {
        type: DataTypes.STRING,
        field: 'place',
        defaultValue: '',
        allowNull: true,
    },   
    re_mark: {
        type: DataTypes.TEXT,
        field: 're_mark',
        defaultValue: '',
        allowNull: true,
    },   
    taxpayer_number: {
        type: DataTypes.STRING,
        field: 'taxpayer_number',
        defaultValue: '',
        allowNull: true,
    },   
    transfer: {
        type: DataTypes.STRING,
        field: 'transfer',
        defaultValue: '',
        allowNull: true,
    },   
    description: {
        type: DataTypes.STRING,
        field: 'description',
        allowNull: true,
        defaultValue: null,
    },
    date_of_receiving: {
        type: DataTypes.STRING,
        field: 'date_of_receiving',
        allowNull: true,
        defaultValue: null,
    },
    date_of_sending: {
        type: DataTypes.STRING,
        field: 'date_of_sending',
        allowNull: true,
        defaultValue: null,
    },
    date_receiving_trans: {
        type: DataTypes.STRING,
        field: 'date_receiving_trans',
        allowNull: true,
        defaultValue: null,
    },
    receipt_number:{
        type: DataTypes.STRING,
        field: 'receipt_number',
        allowNull: true,
        defaultValue: null, 
    },
    date_customer_receives:{
        type: DataTypes.STRING,
        field: 'date_customer_receives',
        allowNull: true,
        defaultValue: null, 
    },
    date_sending_ems:{
        type: DataTypes.STRING,
        field: 'date_sending_ems',
        allowNull: true,
        defaultValue: null, 
    },
    ems_code:{
        type: DataTypes.STRING,
        field: 'ems_code',
        defaultValue: '',
        allowNull: true,
    },
    new_address: {
        type: DataTypes.STRING,
        field: 'new_address',
        defaultValue: '',
        allowNull: true,
    },
    history: {
        type: DataTypes.STRING,
        field: 'history',
        defaultValue: '',
        allowNull: true,
    },
    flag: {
        type: DataTypes.STRING,
        field: 'flag',
        defaultValue: '',
        allowNull: true,
    },
    delivery_type: {
        type: DataTypes.STRING,
        field: 'delivery_type',
        defaultValue: '',
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'masterdata',
});

export default MasterData;