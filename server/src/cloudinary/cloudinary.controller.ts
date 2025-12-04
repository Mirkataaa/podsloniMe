import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('file[]', 5))
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg|webp)',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ) {
    const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadFile(file),
    );
    const cloudoraryResults: UploadApiResponse[] =
      await Promise.all(uploadPromises);

    const finalImages = cloudoraryResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    }));

    return finalImages;
  }
}
