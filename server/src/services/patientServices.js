import { reject } from 'lodash';
import db from '../models/index';
require('dotenv').config();

let postBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        roleId: 'R3',
                    },
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patient: user[0].id },
                        default: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succed!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookingAppointment: postBookingAppointment,
};
