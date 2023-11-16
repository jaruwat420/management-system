import Users from '../models/user.model.js';

async function migrateModel (){
    try {
        await Users.sync({force: true});
        console.log('Models have been synchronized and tables have been created.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}
migrateModel();