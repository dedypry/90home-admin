export interface IRole {
  id: number;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export interface IProvince {
  id: number;
  name: string;
  code: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ICity {
  id: number;
  province_id: number;
  name: string;
  code: string;
  created_at: string | null;
  updated_at: string | null;
  province: IProvince | null;
}

export interface IDistrict {
  id: number;
  city_id: number;
  name: string;
  code: string | null;
  created_at: string | null;
  updated_at: string | null;
  city: ICity | null;
}

export interface IUserProfile {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  nik: string;
  place_birth: string;
  date_birth: string;
  gender: "male" | "female" | string;
  citizenship: string;
  address: string;
  province_id: number;
  city_id: number;
  district_id: number;
  phone: string;
  photo: string;
  province: IProvince;
  city: ICity;
  district: IDistrict;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  status?: string;
  roles: IRole[];
  profile?: IUserProfile;
}
