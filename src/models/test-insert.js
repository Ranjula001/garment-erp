import Employee from "./employee.model.js";

(async () => {
    try{
        const emp = await Employee.create({
            firstName: "Ranjula",
            lastName: "Ilukpitiya",
            email: "ranjula@iwillwin.com",
            role: "Software Engineer",
            salary: 400000.00,
        });

        console.log("🐸 Employee inserted:", emp.toJSON());
        process.exit(0);
    } catch (error) {
        console.error("🐞 Error inserting employee:", error);
        process.exit(1);
    }
})();