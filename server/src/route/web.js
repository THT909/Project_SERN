import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRouters = (app) => {
    //this router use for backend
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    //this router use for a User
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-user", userController.handleGetAllUser);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    //call data table allcode to

    router.get("/api/allcode", userController.getAllCode);

    // this router use for  doctor
    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctor", doctorController.getAllDoctor);
    router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
    router.get("/api/get-detail-doctor-byId", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
    router.get("/api/get-chedule-doctor-by-date", doctorController.getScheduleByDate);
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctor);

    return app.use("/", router);
};

module.exports = initWebRouters;
