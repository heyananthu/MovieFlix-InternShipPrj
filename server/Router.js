const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('./controller');
const moviecontroller = require('./Controller/moviecontroller');
const verifySubscription = require('./Middleware/VerifySubscription')
const Router = express.Router();
const fs = require('fs'); 

// Multer configuration for movie uploads
const movieStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isImage = /jpeg|jpg|png/.test(file.mimetype);
        const isVideo = /mp4|avi|mkv/.test(file.mimetype);

        let uploadPath = 'uploads/';
        if (isImage) uploadPath += 'images/';
        if (isVideo) uploadPath += 'videos/';

        // Ensure directories exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const uploadMovieFiles = multer({
    storage: movieStorage,
    limits: { fileSize: 1024 * 1024 * 3000 }, // 3GB in bytes
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|mp4|avi|mkv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image and video files are allowed!'));
    },
});
const userUpload = require('./uploadConfig');


// Movie Routes
Router.post(
    '/addmovie',
    (req, res, next) => {
        uploadMovieFiles.fields([
            { name: 'thumbnail', maxCount: 1 },
            { name: 'trailer', maxCount: 1 },
            { name: 'video', maxCount: 1 },
        ])(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
    moviecontroller.addmovie
);

// User Routes
Router.post('/userreg', userUpload.single('img'), userController.addUser);
Router.post('/userlogin', userController.userLogin);
Router.get('/userview', userController.userView);
Router.delete('/deleteuser/:id', userController.deleteUser)
Router.get('/usercount', userController.userReportCount);
Router.get('/userprofile/:userId', userController.findUser);


Router.post('/viewmovie', moviecontroller.viewMovies);
Router.post('/moviecount', moviecontroller.moviecount);
Router.post('/usercomplaint', userController.usercomplaint)
Router.get('/getusercomplaints/:userid', userController.getUserComplaint)
Router.post('/complaintcount', userController.complaintCount)
Router.post('/subscriptioncount', moviecontroller.subscriptioncount)
Router.post('/activeSubscription', userController.activeSubscription)

Router.delete('/usercomplaint/:id', userController.deleteComplaint)
Router.delete('/deletemovie/:id', moviecontroller.deleteMovie)
Router.post('/addsubscription', moviecontroller.addSubscription)
Router.post('/viewsubscription', moviecontroller.viewSubscription)
Router.get('/getsubscription/:subscriptionId', moviecontroller.getSubscription)
Router.delete('/deletesubscription/:id', moviecontroller.deleteSubscription)
Router.get('/viewmovie/:movieid/:userid', verifySubscription, moviecontroller.findMovie)
Router.put('/approvemovie/:id', moviecontroller.approveMovie)
Router.post('/carddetails', userController.userCardDetails)
Router.get('/viewmovieinfo/:movieid', moviecontroller.movieViewInfo)
Router.post('/addusersubscription', userController.addUserSubscription)
Router.put('/addusersubscription/:userid/:subscriptionId', userController.addUserSubscription);
Router.get('/search', moviecontroller.searchMovies)
Router.get('/usersubscriptiondetails/:userId', userController.usersubscriptiondetails)
Router.get('/subscriptioncheck/:userId', userController.subscriptionCheck)


module.exports = Router;
