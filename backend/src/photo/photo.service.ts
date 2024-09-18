import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from './photo.schema';
import { unlink } from 'fs/promises';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  // Save Photo
  async savePhoto(
    filename: string,
    filepath: string,
    description?: string,
  ): Promise<Photo> {
    const newPhoto = new this.photoModel({ filename, filepath, description });
    return newPhoto.save();
  }

  // Update the file path of a photo
  async updatePhotoPath(id: string, newPath: string): Promise<Photo> {
    const photo = await this.photoModel.findById(id);
    if (!photo) {
      throw new Error('Photo not found');
    }
    photo.filepath = newPath; // Update the path
    return photo.save();
  }

  // Get All Photos
  async findAllPhotos(): Promise<Photo[]> {
    return this.photoModel.find().exec();
  }

  // Get Photo by ID
  async findPhotoById(id: string): Promise<Photo> {
    return this.photoModel.findById(id).exec();
  }

  // Delete Photo
  async deletePhoto(id: string): Promise<{ message: string }> {
    const photo = await this.photoModel.findById(id);
    if (!photo) {
      throw new Error('Photo not found');
    }
    await unlink(photo.filepath); // Delete the file from the filesystem
    await this.photoModel.deleteOne({ _id: id });
    return { message: 'Photo deleted successfully' };
  }
}
