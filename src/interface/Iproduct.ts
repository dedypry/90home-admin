export interface IProductVariant {
  id: number;
  created_at: string;
  updated_at: string;
  type: string;
  blok?: string | null;
  price: string; // API kirim dalam bentuk string numeric
  description?: string | null;
  product_id: string;
  images: string[];
  commission_fee: string;
  ppn: string;
  pph: string;
}

export interface IProduct {
  id: number;
  created_at: string;
  updated_at: string;
  images: string[];
  price: string;
  cluster: string;
  type?: string | null;
  blok?: string | null;
  description?: string | null;
  updated_by?: number | null;
  attachments: string[];
  listing_type: string;
  developer_id?: number | null;
  commission_fee: string;
  ppn: string;
  pph: string;
  type_ads?: string | null;
  bedroom: number;
  bathroom: number;
  number_of_floors: number;
  surface_area: string;
  building_area: string;
  certificate?: string | null;
  furniture?: string | null;
  listing_title: string;
  public_facilities?: string | null;
  type_property?: string | null;
  pic_id?: number | null;
  variants: IProductVariant[];
}
