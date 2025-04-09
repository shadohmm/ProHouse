export interface Property {
  id?: number; // Optional since it's usually generated on the backend
  property_name: string;
  property_description: string;
  property_price: number;
  property_duration: number;
  property_image: string;
  city: string;
}