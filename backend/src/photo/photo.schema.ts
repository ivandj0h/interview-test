import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Photo extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  filepath: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
