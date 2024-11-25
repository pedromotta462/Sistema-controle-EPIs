import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploaderService } from './image-uploader.service';
import { AuthGuard } from '../../controllers/auth/auth.guard';

@Controller('image-uploader')
export class ImageUploaderController {
    constructor(
        private readonly imageService: ImageUploaderService,
    ) {}

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Request() req, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 200 * 1024 }), // 200 KB
                new FileTypeValidator({ fileType: /image\/(png|jpeg|jpg|webp)/ }),
            ]
        })
    ) file: Express.Multer.File) {

        if (!file) {
            throw new BadRequestException('File is required');
        }

        const user = req.user;
        
        return this.imageService.uploadImageToS3(file, user);
    }
}
