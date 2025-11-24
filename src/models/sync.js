import sequelize from './index.js';
import Employee from './employee.model.js';
import Department from './department.model.js';
import './associations.js'; // Import associations

(async () => {
    try {
        await sequelize.sync({alter: true});  //alter: true updates existing tables without dropping data
        console.log("🐸 All models with relationships synchronized successfully.");
        process.exit(0);  //Exit the process after successful sync
    }
    catch (error) {
        console.error("🐞 Error synchronizing models:", error);
        process.exit(1);  //Exit the process with an error code
    }
})();