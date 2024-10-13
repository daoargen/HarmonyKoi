"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncModels = syncModels;
const user_model_1 = require("../models/user.model");
const userDetail_model_1 = require("../models/userDetail.model");
async function syncModels() {
    try {
        await user_model_1.User.sync().then(() => {
            console.log("User table created successfully!");
        });
        await userDetail_model_1.UserDetail.sync().then(() => {
            console.log("UserDetail table created successfully!");
        });
        console.log("Tables synchronized successfully.");
    }
    catch (error) {
        console.error("Error syncing tables:", error);
        throw error;
    }
}
