const express     = require("express");
const router      = express.Router();
const bcrypt      = require("bcryptjs");
const mongoose    = require("mongoose");
const jwt         = require("jsonwebtoken");
const mongoURI    = require("../../Config").mongoURI;
const secretOrKey = require("../../Config").secretOrKey;
const multer      = require("multer");
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid            = require('gridfs-stream');

const validateRegisterInput = require("../../Validation/auth/registerValidation");
const validateLoginInput = require("../../Validation/auth/loginValidation");

const User = require("../../Models/user");

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Methods", "POST");
    next();
});

var storage = new GridFsStorage({
url: mongoURI,
file: (req, file) => {
    return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
        return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
        filename: filename,
        bucketName: 'profileImages'
        };
        resolve(fileInfo);
    });
    });
}
});
const upload = multer({ storage });

const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('profileImages');
})

router.post("/register", upload.single('profileImage'), (req, res, next) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
        
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({Client_Error: "Email Already Exists!!!"});
        }else {

            let image = (req.file)? req.file.filename : "";

            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profileImage: image
            });
        
            newUser.hashPassword(newUser)
            .then(user => res.json(user))
            .catch(error => console.log(error));
        }
    })
    .catch(next);
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(400).json({Client_Error: "Email Not Found!!!"});
        }else {
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if(!isMatch){
                    return res.status(400).json({Client_Error: "Wrong Password!!!"});
                }else {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        profileImage: user.profileImage
                    }

                    jwt.sign(payload, secretOrKey, {expiresIn: 3600}, (error, token) => {
                        if(error){
                            return res.json({
                                login: "Fail",
                                error: error
                            });
                        }
                        else {
                            return res.json({
                                login: "Success",
                                token: "Bearer " + token
                            })
                        }
                    });
                }
            });
        }
    })
});

router.get("/image/:filename", (req, res) => {    
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(err) throw err;
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

module.exports = router;