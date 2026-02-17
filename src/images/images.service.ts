import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });

  private async generateSignedUrl(key: string, bucket: string): Promise<string> {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this.s3Client, command, { expiresIn: 3500 });
  }

  async getImages(bucket: string) {
    const data = await this.s3Client.send(
      new ListObjectsV2Command({ Bucket: bucket }),
    );

    if (!data?.Contents) {
      console.info(`NO IMAGES FOUND IN ${bucket} S3 Bucket`);
      return { imageUrls: [] };
    }

    const imageUrls = await Promise.all(
      data.Contents.map((obj) => this.generateSignedUrl(obj.Key!, bucket)),
    );

    return { imageUrls };
  }
}
