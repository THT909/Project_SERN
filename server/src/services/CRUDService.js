var bcrypt = require('bcryptjs');
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


let createNewUser=async(data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let hashPasswordFromBcrypt= await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender ==='1'?true:false,
                roleId: data.roleId,
            })
            resolve('oke create a new user succeed')
        } catch (e) {
            reject(e)
        }
    })
}
let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            var hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    
    })
}
let getAllUser=()=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where:{id:userId},
                raw: true
            })
            if(user){
                resolve(user)//return object with id 
            }
            else{
                resolve([])//id over max id return null array
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData=(data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            await db.User.update({
                firstName:data.firstName,
                lastName:data.lastName,
                address:data.address,
                phoneNumber:data.phoneNumber,
                },
                {
                where:{id:data.id}
            })
            let allUser=await db.User.findAll();
            resolve(allUser)
        } catch (e) {
            console.log(e)
        }
    })
}

module.exports={
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,

}