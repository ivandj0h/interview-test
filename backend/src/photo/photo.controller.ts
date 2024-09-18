import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpException,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs/promises';

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

    const newFilename = `${photo._id}${extname(file.originalname)}`;
    const newPath = `./uploads/${newFilename}`;

    // Pindahkan/rename file
    await fs.rename(file.path, newPath);

    // Update path file di database
    await this.photoService.updatePhotoPath(photo._id as string, newPath);

    return {
      message: 'Foto berhasil diupload',
      photo: {
        ...photo.toObject(),
        filepath: newPath,
      },
    };
  }

  // Retrieve all photos
  @Get()
  async getAllPhotos() {
    const photos = await this.photoService.findAllPhotos();
    return {
      message: 'Successfully get All Photos',
      data: photos.map((photo) => ({
        id: photo.id,
        filename: photo.filename,
        filepath: `http://localhost:8000/uploads/${encodeURIComponent(photo.id)}.jpg`,
        description: photo.description,
        createdAt: photo.createdAt,
      })),
    };
  }

  // Retrieve a photo by ID
  @Get(':id')
  async getPhotoById(@Param('id') id: string) {
    const photo = await this.photoService.findPhotoById(id);
    if (!photo) {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Successfully retrieved photo',
      data: {
        id: photo.id,
        filename: photo.filename,
        filepath: `http://localhost:8000/uploads/${encodeURIComponent(photo.id)}.jpg`,
        description: photo.description,
        createdAt: photo.createdAt,
      },
    };
  }

  // Delete a photo by ID
  @Delete(':id')
  async deletePhoto(@Param('id') id: string) {
    try {
      const result = await this.photoService.deletePhoto(id);
      return result;
    } catch {
      throw new HttpException(
        'Photo not found or delete failed',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
