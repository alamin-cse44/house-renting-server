import { Document, Model } from 'mongoose';

export interface IBike {
  name: string;
  categories: 'Sport' | 'Cruiser' | 'Adventure' | 'Naked' | 'Dirt';
  brand: 'Yamaha' | 'Honda' | 'Suzuki' | 'Ducati' | 'Kawaski';
  model: string;
  price: number;
  stock: boolean;
  quantity: number;
  description?: string;
  image?: string;
}

export type BikeDocument = IBike & Document;

export interface BikeModel extends Model<IBike> {
  isBikeExistById(id: string): Promise<IBike>;
}
