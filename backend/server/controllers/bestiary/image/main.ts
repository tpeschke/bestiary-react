import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer'
import multerS3 from 'multer-s3'
import { key, access, bucketName } from '../../../server-config'

const s3 = new S3Client({
    region: 'us-west-1',
    credentials: {
        accessKeyId: key,
        secretAccessKey: access
    }
});

const fileFilter = (request: any, file: any, callback: Function) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false)
    }
};

export default multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: bucketName,
        key: function (req: any, file: any, callback: Function) {
            req.file = req.params.beastID;
            callback(null, req.params.beastID);
        }
    })
});