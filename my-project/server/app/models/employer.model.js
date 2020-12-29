const mongoose = require("mongoose");

const Employer = mongoose.model(
    "Employer",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        companyName: {
            type: String,
            default: 'Tên Công ty'
        },
        webLink: {
            type: String,
            default: 'KhongCoLink'
        },
        address: {
            type: String,
            default: 'Vị trí công ty'
        },
        introduce: Array,
        banner: {
            type: String,
            default: 'https://firebasestorage.googleapis.com/v0/b/laptrinhweb-4dbf0.appspot.com/o/employer%2Fbanner%2Ftopcv_cover_vp2.jpg?alt=media&token=1194297c-fd27-411c-a4e7-ced3aa654c19'
        },
        avatar: {
            type: String,
            default: 'https://firebasestorage.googleapis.com/v0/b/laptrinhweb-4dbf0.appspot.com/o/employer%2Favatar%2Ftopcv-logo-4.png?alt=media&token=28dd55f3-f86b-45b6-a160-aa584d0e7b54'
        },
        posts: Array,
        members: {
            type: String,
            default: '0 Nhân viên',
        },
        notify: {
            type: Number,
            default: 0,
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = Employer;