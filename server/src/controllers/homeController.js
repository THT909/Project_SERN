import db from '../models/index'
import CRUDServive from '../services/CRUDService.js'
let getHomePage = async (req,res)=>{
    try {
        let data = await db.User.findAll();
        let data2 = await db.History.findAll();
        // console.log('----------------------------------------')
        // console.log(data)
        // console.log('----------------------------------------')
        return res.render('homepage.ejs',{
            data:JSON.stringify(data.concat(data2))
        })
    } catch (error) {
        console.log(e)
    }
}

let getAboutPage=(req,res)=>{
    return res.render('test/about.ejs')
}
let getCRUD=(req,res)=>{
    return res.render('test/crud.ejs')
}

let postCRUD=async(req,res)=>{
    let message= await CRUDServive.createNewUser(req.body)
    console.log(message)
    return res.send('post crud form server')
}
let displayGetCRUD= async(req, res)=>{
    let data = await CRUDServive.getAllUser()
    // console.log('---------------------------')
    // console.log(data)
    // console.log('---------------------------')
    return res.render('test/displayCRUD.ejs',{
        dataTable:data
    })
}
let getEditCRUD= async(req, res)=>{
    let userId =req.query.id
    if(userId){
        let userData = await CRUDServive.getUserInfoById(userId)
        // console.log('--------------------------')
        // console.log(userData)
        // console.log('--------------------------')
        // return res.send('Users found')
        return res.render('test/editCRUD.ejs',{
            user:userData
        })
    }
    else{
        return res.send('Users not found')
    }
}
let putCRUD=async(req,res)=>{
    let data =req.body
    let allUser = await CRUDServive.updateUserData(data)
    return res.render('test/displayCRUD.ejs',{
        dataTable:allUser
    })
}
let deleteCRUD=async(req,res)=>{
    let id = req.query.id;
    if(id){
        await CRUDServive.deleteUserById(id);
        return res.send('delete user susseed')
    }
    else{
        return res.send(' delete error')
    }
}

module.exports ={
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
}