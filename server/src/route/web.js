import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';

let router = express.Router();

let initWebRouters = (app) => {
    //this router use for backend
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/about', homeController.getAboutPage);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);

    //this router use for a User
    router.get('/api/allcode', userController.getAllCode);
    router.post('/api/login', userController.handleLogin);
    router.put('/api/edit-user', userController.handleEditUser);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);

    // this router use for  doctor
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-detail-doctor-byId', doctorController.getDetailDoctorById);
    router.get('/api/get-chedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctor);

    // this router use for patient
    router.post('/api/patient-book-appointment', patientController.postBookingAppointment);

    return app.use('/', router);
};

module.exports = initWebRouters;
