

import mongoose from "mongoose";

const ConnectStoredb = async (projectId, schema, schemaName) => {
    mongoose.set('strictQuery', true);

    let connectionOptions = {
        // // useNewUrlParser: true,
        // // useUnifiedTopology: true,
        // socketTimeoutMS: 45000, // Adjust as needed
        // connectTimeoutMS: 30000, // Adjust as needed
        // ssl: true,                       // Set according to your scenario
        // // sslValidate: true,               // Set according to your scenario
        // tlsAllowInvalidCertificates: false,  // Set according to your scenario
        maxIdleTimeMS: 60000,
    };







    let dbConnection = mongoose.connections.find(conn => conn.name === projectId && conn.readyState === 1);

    if (!dbConnection) {
        // If no existing connection, create a new one
        dbConnection = mongoose.createConnection(`mongodb+srv://${process.env.MONGODB_URI_NAME}:${process.env.MONGODB_URI_PASSWORD}@cluster0.5fzboev.mongodb.net/${projectId}?retryWrites=true&w=majority`, connectionOptions);
    }

    // Check if the model already exists on the connection
    if (!dbConnection.models[schemaName]) {
        dbConnection.model(schemaName, schema);
    }

    const model = dbConnection.model(schemaName);

    const closeConnection = async () => {
        await dbConnection.close();
        Object.keys(mongoose.models).forEach(modelName => {
            const model = mongoose.models[modelName];
            if (model.db.name === projectId) {
                delete mongoose.models[modelName];
            }
        });
    };

    return [model, closeConnection];
};

export default ConnectStoredb;

