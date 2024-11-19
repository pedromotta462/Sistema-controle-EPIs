import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { Funcionario } from '@prisma/client';
import { EmployeeService } from 'src/services/employee/employee.service';
import { AdminService } from 'src/services/admin/admin.service';

@Injectable()
export class ImageUploaderService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private configService: ConfigService,
    private userService: EmployeeService,
    private adminService: AdminService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadImageToS3(file: Express.Multer.File, user: any) {
    
    const fileExtension = extname(file.originalname);
    const fileName = `${user.sub}${fileExtension}`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      const url = `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;

      if(user.role){
        await this.userService.update({
          data: {
            profilePicture: url,
          },
          where: { id: user.sub },
        });
      }else {
        await this.adminService.update({
          data: {
            profilePicture: url,
          },
          where: { id: user.sub },
        });
      }

      return {
        url,
        fileName,
      };
    } catch (error) {
      console.log('Failed to upload image: ', error);
      throw new BadRequestException('Failed to upload image: ' + error);
    }
  }
}
