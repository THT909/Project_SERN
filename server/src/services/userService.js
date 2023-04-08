import db from '../models/index';
var bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


let hanleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //if alredy exist? compare:reject
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
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
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'null'
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    //raw: true
                })
                console.log(users)
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                    //raw: true
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist ?
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used, Please try another email'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }

    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await db.User.findOne({ where: { id: data.id } })) {
                resolve({
                    errCode: 2,
                    errMessage: `Can't find user`
                })
                if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                    resolve({
                        errCode: 3,
                        errMessage: `Missing parameter`
                    })
                }
            }
            if (data.avatar) {

                await db.User.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                    image: data.avatar
                },
                    {
                        where: { id: data.id }
                    })
            }
            else {
                await db.User.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                },
                    {
                        where: { id: data.id }
                    })
            }
            resolve({
                errCode: 0,
                errMessage: 'Up date user succeeds'
            })

        } catch (e) {
            reject(e)
        }
    })
}


let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await db.User.findOne({ where: { id: id } })) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
            await db.User.destroy({
                where: {
                    id: id
                }
            })
            resolve({
                errCode: 0,
                errMessage: 'The user id delete'
            });
        } catch (e) {
            reject(e)
        }
    })
}

let getAllcodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        // console.log(typeInput)
        try {

            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameter !'
                });
            }
            else {

                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0
                res.data = allCode
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    hanleUserLogin: hanleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllcodeService: getAllcodeService,

}