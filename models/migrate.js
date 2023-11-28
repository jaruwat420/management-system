import Users from '../models/user.model.js';
import MasterData from '../models/masterdata.model.js';
import Deposit from './deposit-transfer.model.js';
import LogHistory from './system_log_history.modal.js';


async function migrateModel (){
    try {
        await Users.sync({force: true});
        await MasterData.sync({force: true});
        await Deposit.sync({force: true});
        await LogHistory.sync({force: true});
        console.log('Models have been synchronized and tables have been created.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}
migrateModel();