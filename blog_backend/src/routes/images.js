import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import gm from 'gm';
let router = express.Router();

//date format
function getFileDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const fullDate = year+"_"+month+""+day+"_"+hour+"_"+min+"_"+sec;
    return fullDate
}
//fileupload
const thumbstorage = multer.diskStorage({
    destination: './images/thumb',
    filename(req, file, cb) {
      cb(null, `${getFileDate(new Date())}-${file.originalname}`);
    },
  });
const videostorage = multer.diskStorage({
    destination: './videos',
    filename(req, file, cb) {
        cb(null, `${getFileDate(new Date())}-${file.originalname}`);
    },
});
const storage = multer.diskStorage({
  destination: './images',
  filename(req, file, cb) {
    cb(null, `${getFileDate(new Date())}-${file.originalname}`);
  },
});
const thumbUpload = multer({ storage : thumbstorage })
const videoUpload = multer({ storage : videostorage })
const upload = multer({ storage : storage })

router.post('/thumb', thumbUpload.single('thumb'), (req, res) => {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    const file = req.file;
    const meta = req.body; 
    res.json(file);
});

router.post('/videos', videoUpload.single('video'), (req, res) => {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    const file = req.file;
    const meta = req.body; 
    res.json(file);
});
router.delete('/videos/:name', function (req, res) {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    const filename = req.params.name;
    fs.unlink(path.join(__dirname,'../../videos/'+filename), function (err,data) { 
        if (err) return res.status(500).json({
            error: "video delete fail"
        });
        res.end(data)
    });
});

router.post('/', upload.any(), (req, res) => {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    const file = req.files; 
    const meta = req.body; 
    res.json(file)
});
//fileupload end
// 이미지파일 호스팅 로직 
router.get('/thumb/:name',function (req,res){     
    const filename = req.params.name;
    fs.exists(path.join(__dirname,'../../images/thumb/'+filename), function (exists) {
        if (exists) {
            fs.readFile(path.join(__dirname,'../../images/thumb/'+filename), function (err,data){
                res.end(data);
            });
        } else {
            res.end('file is not exists');
        }
    })
});
router.delete('/thumb/:name', function (req, res) {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    const filename = req.params.name;
    fs.unlink(path.join(__dirname,'../../images/thumb/'+filename), function (err,data) { 
        if (err) return res.status(500).json({
            error: "images delete fail"
        });
        res.end(data)
    });
});

router.get('/:name',function (req,res){     
    const filename = req.params.name;
    fs.exists(path.join(__dirname,'../../images/'+filename), function (exists) {
        if (exists) {
            fs.readFile(path.join(__dirname,'../../images/'+filename), function (err,data){
                res.end(data);
            });
        } else {
            res.end('file is not exists');
        }
    })
});
router.delete('/:name', function (req, res) {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    const filename = req.params.name;
    fs.unlink(path.join(__dirname,'../../images/'+filename), function (err,data) { 
        if (err) return res.status(500).json({
            error: "images delete fail"
        });
        res.end(data)
    });
});
module.exports = router;