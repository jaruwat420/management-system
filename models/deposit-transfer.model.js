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

const Deposit = sequelize.define('deposit', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: true,
        defaultValue: '',
    },
    date: {
        type: DataTypes.STRING,
        field: 'date',
        allowNull: true,
        defaultValue: '',
    },
    fullname: {
        type: DataTypes.STRING,
        field: 'fullname',
        allowNull: true,
        defaultValue: '',
    },
    transfer_name: {
        type: DataTypes.STRING,
        field: 'transfer_name',
        allowNull: true,
        defaultValue: '',
    },
    engine_number: {
        type: DataTypes.STRING,
        field: 'engine_number',
        allowNull: true,
        defaultValue: '',
    },
    color: {
        type: DataTypes.STRING,
        field: 'color',
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
    transfer_in: {
        type: DataTypes.STRING,
        field: 'transfer_in',
        allowNull: true,
        defaultValue: '',
    },   
    transfer_price: {
        type: DataTypes.STRING,
        field: 'transfer_price',
        allowNull: true,
        defaultValue: '',
    },   
    receive_book_sik: {
        type: DataTypes.STRING,
        field: 'receive_book_sik',
        defaultValue: '',
    },   
    send_agent: {
        type: DataTypes.STRING,
        field: 'send_agent',
        allowNull: true,
        defaultValue: '',
    },   
    return_agent: {
        type: DataTypes.STRING,
        field: 'return_agent',
        allowNull: true,
        defaultValue: '',
    },   
    receive_book_cu: {
        type: DataTypes.STRING,
        field: 'receive_book_cu',
        allowNull: true,
        defaultValue: '',
    },   
    date_customer_receive: {
        type: DataTypes.STRING,
        field: 'date_customer_receive',
        allowNull: true,
        defaultValue: '',
    },   
    address_ems: {
        type: DataTypes.STRING,
        field: 'address_ems',
        allowNull: true,
        defaultValue: '',
    },   
    date_send_ems: {
        type: DataTypes.STRING,
        field: 'date_send_ems',
        allowNull: true,
        defaultValue: '',
    },   
    address: {
        type: DataTypes.STRING,
        field: 'address',
        defaultValue: '',
        allowNull: true,
    },
    flag_status: {
        type: DataTypes.STRING,
        field: 'flag_status',
        defaultValue: '',
        allowNull: true,
    },   
    re_mark: {
        type: DataTypes.STRING,
        field: 're_mark',
        defaultValue: '',
        allowNull: true,
    },   
    edit_by: {
        type: DataTypes.STRING,
        field: 'edit_by',
        defaultValue: '',
        allowNull: true,
    }  
}, {
    timestamps: false,
    tableName: 'deposit',
});
export default Deposit;