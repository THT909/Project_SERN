import db from '../models/index'

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


module.exports ={
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,

}