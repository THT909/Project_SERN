import userService from '../services/userService'

let handleLogin = async (req, res) => {
    //check email -> check password
    //1 compare
    //2 pasword do not match)
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter',
        })
    }
    let userData = await userService.hanleUserLogin(email, password)
    return res.status(200).json({
        // errCode: 0,
        // message: 123,
        // yourEmail: email,
        // yourPasword: password
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}
module.exports = {
    handleLogin: handleLogin,
}