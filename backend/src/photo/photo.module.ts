import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Photo, PhotoSchema } from './photo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
