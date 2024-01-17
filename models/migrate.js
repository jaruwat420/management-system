import Users from '../models/user.model.js';
import MasterData from '../models/masterdata.model.js';
import Deposit from './deposit-transfer.model.js';
import LogHistory from './system_log_history.modal.js';


async function migrateModel (){
    try {
        await Users.sync({alter: true});
        await MasterData.sync({alter: true});
        await Deposit.sync({alter: true});
        await LogHistory.sync({alter: true});
        console.log('Models have been synchronized and tables have been created.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}
migrateModel();