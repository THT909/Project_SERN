import {
    getAllCodeService,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getTopDoctorHome,
    getAllDoctor,
    saveDetailDoctorService
} from '../../services/userService';
import { LIMIT } from "../../utils"
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })


// get all Gender from table Allcode
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailded());
            }
        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

// get all Possion from table Allcode
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {

        try {

            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailded());
            }
        } catch (e) {
            dispatch(fetchPositionFailded());
            console.log('fetchPositionStart', e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})
//get all Role from table Allcode  
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {

        try {

            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailded());
            }
        } catch (e) {
            dispatch(fetchRoleFailded());
            console.log('fetchRoleStart', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

// Redux to create New user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await createNewUserService(data);
            console.log('check admin action log: ', res)
            if (res && res.errCode === 0) {
                toast.success("create a new user suceed !")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded());
            console.log('createNewUser err', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})
// Redux to delete New user
export const deleteUser = (id) => {
    return async (dispatch, getState) => {

        try {

            let res = await deleteUserService(id);
            console.log("check id redux", id)
            console.log('check admin action log: ', res)
            if (res && res.errCode === 0) {
                toast.success("Delete a user suceed !")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete a user error !")
                dispatch(deleteUserFailded());
            }
        } catch (e) {
            toast.error("Delete a  user error !")
            dispatch(deleteUserFailded());
            console.log('Delete user err', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})
export const updateUser = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await editUserService(data);
            console.log("check id redux", data)
            console.log('check admin action log: ', res)
            if (res && res.errCode === 0) {
                toast.success("Update a user suceed !")
                dispatch(updateUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("update a user error !")
                dispatch(updateUserFailded());
            }
        } catch (e) {
            toast.error("Update a  user error !")
            dispatch(updateUserFailded());
            console.log('Update user err', e)
        }
    }
}
export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
})
export const updateUserFailded = () => ({
    type: actionTypes.UPDATE_USER_FAILDED
})
// Redux Api call to get all user
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {

        try {

            let res = await getAllUsers('ALL')

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                toast.error("Fetch all  user error !")
                dispatch(fetchAllUserFailded());
            }
        } catch (e) {
            toast.error("Fetch all  user error !")
            dispatch(fetchAllUserFailded());
            console.log('fetchAllUserStart', e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailded = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED,
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome(LIMIT.TOP_DOCTOR)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    data: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILDED
                })
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTOR_FAILDED", e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILDED
            })
        }
    }

}
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILDED
                })
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTOR_FAILDED", e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILDED
            })
        }
    }

}
export const saveInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.response.errCode === 0) {
                toast.success("Save Info detail doctor suceed !")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                console.log('redux save service', res)
                toast.error("Save Info detail doctor error !")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
                })
            }
        } catch (e) {
            toast.error("Save Info detail doctor error !")
            console.log("SAVE_DETAIL_DOCTOR_FAILDED", e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
            })
        }
    }

}




// let res1 = await getTopDoctorHome(1)
// console.log("check top doctor", res1)

// start --> doing --> end