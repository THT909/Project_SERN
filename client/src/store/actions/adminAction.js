import {
    getAllCodeService,
    getAllUsers,
    createNewUserService,
    deleteUserService,
} from '../../services/userService';
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






// start --> doing --> end