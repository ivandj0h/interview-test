import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from './photo.schema';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  async savePhoto(filename: string, filepath: string): Promise<Photo> {
    const newPhoto = new this.photoModel({ filename, filepath });
    return newPhoto.save();
  }
}
