import db from '../models/index';
var bcrypt = require('bcryptjs');
let hanleUserLogin = (email, password) => {
    return new Promise(async (resole, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //if alredy exist? compare:reject
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `OK`
                        delete user.password
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found~`
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `your email ins't exits in system. Plese try other email or register new use`
            }
            resole(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resole(true)
            }
            else {
                resole(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    hanleUserLogin: hanleUserLogin
}