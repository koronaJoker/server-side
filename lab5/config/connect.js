import sequelize from "./database.js";

async function connect() {
    try {
        await sequelize.authenticate()
        console.log("PostgreSQL connected")
    }
    catch (error) {
        console.error(`Connection failed: ${error.message}`)
        throw error
    }
}

export default connect