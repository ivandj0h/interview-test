import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => ((Math.random() * 16) | 0).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: CreatePhotoDto,
  ) {
    const photo = await this.photoService.savePhoto(
      createPhotoDto.filename,
      file.path,
      createPhotoDto.description,
    );
    return {
      message: 'Foto berhasil diupload',
      photo,
    };
  }

  // Retrieve all photos
  @Get()
  async getAllPhotos() {
    const photos = await this.photoService.findAllPhotos();
    return photos.map((photo) => ({
      id: photo.id,
      filename: photo.filename,
      filepath: `http://localhost:8000/uploads/${photo.filename}`,
      description: photo.description,
      createdAt: photo.createdAt,
    }));
  }

  // Retrieve a photo by ID
  @Get(':id')
  async getPhotoById(@Param('id') id: string) {
    const photo = await this.photoService.findPhotoById(id);
    return {
      id: photo.id,
      filename: photo.filename,
      filepath: `http://localhost:8000/uploads/${photo.filename}`,
      description: photo.description,
      createdAt: photo.createdAt,
    };
  }
}
