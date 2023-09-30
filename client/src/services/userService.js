// import { template } from 'lodash'
import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
    //template String
    return axios.get(`/api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
    // console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (id) => {
    // return axios.delete('/api/delete-user', id)
    return axios.delete('/api/delete-user', { data: { id: id } });
};
const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
};
const getAllCodeService = (data) => {
    return axios.get(`/api/allcode?type=${data}`);
};
const getTopDoctorHome = (limit) => {
    return axios.get(`api/top-doctor-home?limit=${limit}`);
};
const getAllDoctor = () => {
    return axios.get(`api/get-all-doctor`);
};
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data);
};
const getDetailDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-byId?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-chedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorInfor = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHome,
    getAllDoctor,
    saveDetailDoctorService,
    getDetailDoctorService,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getExtraInforDoctorInfor,
    getProfileDoctorById,
};
