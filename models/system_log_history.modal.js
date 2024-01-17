import { Sequelize,DataTypes } from 'sequelize';
import dotenv from 'dotenv'; 
import MasterData from './masterdata.model.js';
import Deposit from './deposit-transfer.model.js';

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

const LogHistory = sequelize.define('system_log_history', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        field: 'user_id',
        defaultValue: '',
        allowNull: true,
    },
    user_old_name: {
        type: DataTypes.STRING,
        field: 'user_old_name',
        defaultValue: '',
        allowNull: true,
    },
    user_new_name: {
        type: DataTypes.STRING,
        field: 'user_new_name',
        defaultValue: '',
        allowNull: true,
    },
    action_type: {
        type: DataTypes.STRING,
        field: 'action_type',
        defaultValue: '',
        allowNull: true,
    },
    item_type: {
        type: DataTypes.STRING,
        field: 'item_type',
        defaultValue: '',
        allowNull: true,
    },
    change_data: {
        type: DataTypes.TEXT,
        field: 'change_data',
        defaultValue: '',
        allowNull: true,
    },
    deposit_id: {
        type: DataTypes.STRING,
        field: 'deposit_id',
        defaultValue: '',
        allowNull: true,
    }
    
}, {
    timestamps: true,
    tableName: 'system_log_history',
});

LogHistory.belongsTo(MasterData, { foreignKey: 'item_id', targetKey: 'id', as: 'masterdata' });
// LogHistory.belongsTo(Deposit, { foreignKey: 'deposit_id', targetKey: 'id', as: 'deposit' });


export default LogHistory;