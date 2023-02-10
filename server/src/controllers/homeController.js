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
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
    return res.render('test/displayCRUD.ejs',{
        dataTable:data
    })
}

module.exports ={
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,

}