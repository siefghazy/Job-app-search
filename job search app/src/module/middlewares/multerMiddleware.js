import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
const storage = multer.diskStorage({
})
  function fileFilter (req, file, cb) {

  if(!file.mimetype.startsWith('application')){
    cb(null, false)
  }
    cb(null, true)
  }
  const upload=multer({fileFilter,storage})
  const imageUpload=upload.fields([{
    name:'resume',
    maxCount:3
  }])
  export default imageUpload