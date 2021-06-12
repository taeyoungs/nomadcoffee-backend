import AWS from 'aws-sdk';
import { GraphQLFileUpload } from '../type';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET as string,
  },
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'nomad-uploader';

export const uploadToS3 = async (
  file: GraphQLFileUpload,
  userId: number,
  folderName: string
) => {
  const { filename, createReadStream } = await file;
  const newFilename = `coffee/${folderName}/${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const { Location } = await s3
    .upload({
      Bucket: BUCKET_NAME,
      Key: newFilename,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();

  return Location;
};

const FOLDER_PATH = 'coffee/';

export const deleteUploadedFile = async (path: string, where: string) => {
  const filename = path.split(`/${FOLDER_PATH}${where}/`)[1];
  const filePath = `${FOLDER_PATH}${where}/${filename}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: filePath,
  };

  try {
    await s3.headObject(params).promise();

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.warn(error.code);
    }
  } catch (error) {
    console.warn(error.code);
  }
};
