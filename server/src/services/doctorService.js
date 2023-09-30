import db from '../models/index';

require('dotenv').config();
import _, { reject } from 'lodash';
import { where } from 'sequelize';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
//******* This function err when using nest:true data duplicate **********//
// let getTopDoctorHome = (limit) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findAll({
//                 limit: limit,
//                 order: [['createdAt', 'DESC']],
//                 attributes: {
//                     exclude: ['password']
//                 },
//                 where: { roleId: 'R2' },
//                 include: [
//                     { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
//                     { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
//                 ],
//                 raw: true,
//                 nest: true,
//             })
//             resolve({
//                 errCode: 0,
//                 data: user,
//                 errMessage: ''
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'],
                },
                where: { roleId: 'R2' },
            });

            let userData = [];

            for (let i = 0; i < users.length; i++) {
                let user = users[i];

                let positionData = await db.Allcode.findOne({
                    where: { keyMap: user.positionId },
                    attributes: ['valueEn', 'valueVi'],
                });

                let genderData = await db.Allcode.findOne({
                    where: { keyMap: user.gender },
                    attributes: ['valueEn', 'valueVi'],
                });

                userData.push({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    image: user.image,
                    roleId: user.roleId,
                    positionId: user.positionId,
                    positionData: positionData,
                    genderData: genderData,
                });
            }

            resolve({
                errCode: 0,
                data: userData,
                errMessage: '',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image'],
                },
            });
            resolve({
                errCode: 0,
                errMessage: 'Success',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.doctorId ||
                !data.contentHTML ||
                !data.contentMarkdown ||
                !data.action ||
                !data.selectedPrice ||
                !data.selectedPayment ||
                !data.selectedProvince ||
                !data.addressClinic ||
                !data.nameClinic
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Mising paremeter',
                });
            } else {
                // upset to Markdown

                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    });
                } else if (data.action === 'EDIT') {
                    await db.Markdown.update(
                        {
                            contentHTML: data.contentHTML,
                            contentMarkdown: data.contentMarkdown,
                            description: data.description,
                            updateAt: new Date(),
                        },
                        {
                            where: { doctorId: data.doctorId },
                        }
                    );
                }

                //*********************HERE ????*********************************//

                if (data.action === 'CREATE') {
                    await db.Doctor_infor.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        provinceId: data.selectedProvince,
                        paymentId: data.selectedPayment,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
                        note: data.note,
                    });
                } else if (data.action === 'EDIT') {
                    await db.Doctor_infor.update(
                        {
                            priceId: data.selectedPrice,
                            provinceId: data.selectedProvince,
                            paymentId: data.selectedPayment,
                            addressClinic: data.addressClinic,
                            nameClinic: data.nameClinic,
                            note: data.note,
                            updateAt: new Date(),
                        },
                        {
                            where: { doctorId: data.doctorId },
                        }
                    );
                }
                //***************here************8 */
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requied parameter',
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi'],
                        },

                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'priceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'provinceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'paymentTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                            ],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
            resolve({
                errCode: 1,
                errMessage: 'Missing required parameter',
            });
        } else {
            try {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }

                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                });

                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Success !',
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
};
let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !',
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'timeTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    dataSchedule,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getExtraInforDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.Doctor_infor.findOne({
                    where: { doctorId: doctorId },
                    attributes: {
                        exclude: ['id', 'doctorId'],
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'priceTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                        {
                            model: db.Allcode,
                            as: 'provinceTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                        {
                            model: db.Allcode,
                            as: 'paymentTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getProfileDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: id,
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'priceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'provinceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'paymentTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                            ],
                        },
                    ],
                    raw: false,
                    nest: false,
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctor: getExtraInforDoctor,
    getProfileDoctorById: getProfileDoctorById,
};
