import sequelize from './index.js';
import Employee from './employee.model.js';

(async () => {
    try {
        await sequelize.sync({force: true});  //Sync all models with DB, force:true drops and recreates tables (used only during development)
        console.log("🐸 All models were synchronized successfully.");
        process.exit(0);  //Exit the process after successful sync
    }
    catch (error) {
        console.error("🐞 Error synchronizing models:", error);
        process.exit(1);  //Exit the process with an error code
    }
})();