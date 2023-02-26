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

let handleGetAllUser = async (req, res) => {
    let id = req.query.id;// ALL or SINGLE user( id )
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'mising require parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    // console.log(message)
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}