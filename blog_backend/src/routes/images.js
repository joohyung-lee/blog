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
    const fullDate = year+""+month+""+day+""+hour+""+min+""+sec;
    return fullDate
}
//fileupload
const thumbstorage = multer.diskStorage({
    destination: './images/thumb',
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
const upload = multer({ storage : storage })

router.post('/thumb', thumbUpload.single('thumb'), (req, res) => {
    const file = req.file;
    const meta = req.body; 
    // gm(file.path)
    // .gravity('Center')
    // .resize(350, 350, file.path, function (err) {
    //     if (err){
    //         console.error(err)
    //     }else{
    //         console.log('done - thumb');
    //         res.json(file);
    //     }
    //   });
    gm(file.path)
    .write(file.path, function (err) {
    if (err){
    console.error(err)
    }else{
        console.log('done - thumb');
        
        res.json(file);
    }
    });
    
});

router.post('/', upload.any(), (req, res) => {
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
    const filename = req.params.name;
    fs.unlink(path.join(__dirname,'../../images/thumb/'+filename), function (err,data) { 
        if (err) return res.status(500).json({
            error: "images delete fail"
        });
        res.end(data)
    });
});
router.delete('/thumb/:name', function (req, res) {
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
    const filename = req.params.name;
    fs.unlink(path.join(__dirname,'../../images/'+filename), function (err,data) { 
        if (err) return res.status(500).json({
            error: "images delete fail"
        });
        res.end(data)
    });
});
module.exports = router;