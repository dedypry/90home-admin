import { IUser } from "./IUser";

export interface IDeveloper {
  id: number;
  logo?: string;
  company_name?: string;
  company_brand?: string;
  phone?: string;
  email?: string;
  address?: string;
  address_title?: string;
  coordinators?: IUser[];
  coordinator_ids?: string[];
  created_at?: string; // bisa pakai Date kalau di-mapping
  updated_at?: string; // bisa pakai Date juga
}
