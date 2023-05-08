import db from '../models/index'

require('dotenv').config();
import _ from 'lodash'
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                where: { roleId: 'R2' },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: user,
                errMessage: ''
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                errMessage: "Success",
                data

            })
        } catch (e) {
            reject(e)
        }
    })

}

let saveDetailInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Mising paremeter'
                })
            } else {
                if (data.action === "CREATE") {

                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                }
                else if (data.action === "EDIT") {
                    await db.Markdown.update({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                    }
                        ,
                        {
                            where: { doctorId: data.doctorId }
                        }
                    )
                }
                resolve({
                    errCode: 0,
                    errMessage: "OK"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing requied parameter"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true,
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }
                if (!data) { data = {} }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(
            'check data', data
        );
        if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
            resolve({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        else {

            try {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item
                    })

                }
                console.log('hello bulk', schedule)

                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId, date: data.formatedDate },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true
                    }
                )
                //cover date
                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime()
                        return item;
                    })
                }
                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })
                console.log('==================================');
                console.log(toCreate);
                console.log('==================================');
                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Success !',
                })

            } catch (e) {
                console.log(e)
            }
        }


    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
}