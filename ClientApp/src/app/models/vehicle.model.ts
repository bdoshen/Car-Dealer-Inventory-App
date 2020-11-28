import { Feature } from './feature.model';

export interface Vehicle {
    vehicleID: number;
    make: string;
    model: string;
    year: number;
    type: string;
    retailPrice: number;
    sellingPrice: number;
    features: Feature[];
    feature: string;
    status: string;
}
