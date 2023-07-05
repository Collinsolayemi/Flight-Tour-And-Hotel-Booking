"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constant_1 = require("./constant");
const dotenv = require("dotenv");
dotenv.config();
exports.CloudinaryProvider = {
    provide: constant_1.CLOUDINARY,
    useFactory: () => {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map