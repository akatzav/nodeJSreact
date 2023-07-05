const dotenv = require('dotenv');
const cloudinaryModule = require('cloudinary');
dotenv.config();
const clodinary = cloudinaryModule.v2;
cloudinaryModule.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = clodinary;
export {};
