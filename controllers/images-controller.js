require("dotenv").config();
const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
});

const PORTFOLIO_IMAGES_API_PATH = '/api/project/images';
const PORTFOLIO_CONNECT_IMAGES_API_PATH = '/api/project/connect/images';

// Function to generate signed URLs for objects
const generateSignedUrl = async (key, bucket) => {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3500 }); // Expires in 1 hour 3600
    
    return signedUrl;
};

const getImageFromS3 = async (req, res, next) => {
    let params = {
        // default bucket
        Bucket: process.env.AWS_S3_PORTFOLIO_BUCKET,
    };

    switch(req.path){
        case PORTFOLIO_IMAGES_API_PATH:
            params.Bucket = process.env.AWS_S3_PORTFOLIO_BUCKET;
        break;
        case PORTFOLIO_CONNECT_IMAGES_API_PATH:
            params.Bucket = process.env.AWS_S3_CONNECT_BUCKET
        break;
        default:
            console.err('No S3 Bucket set. Using default bucket.')
    }

    try {
        const data = await s3Client.send(new ListObjectsV2Command({ Bucket: params.Bucket }));
        const imageUrls = await Promise.all(data.Contents.map(obj => generateSignedUrl(obj.Key, params.Bucket)));

        res.json({ imageUrls });
    } catch (err) {
        console.log(`an error has occured: ${err}`);
        next();
    }
}

exports.getImageFromS3 = getImageFromS3;