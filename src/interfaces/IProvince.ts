export interface IProvince {
  slug: string;
  number: number;
  title: string;
  title_nepali: string;
  detail: string;
  is_active: boolean;
}

export interface IDistrict {
  slug: string;
  province: string;
  title: string;
  title_nepali: string;
  remarks: string;
}

export interface IMunicipalityMetropolitan {
  slug: string;
  district: string;
  title: string;
  title_nepali: string;
  category: string;
  remarks: string;
}

export interface IProvinceResponse {
  count: number;
  next: any;
  previous: any;
  results: IProvince[];
}

export interface IDistrictResponse {
  count: number;
  next: any;
  previous: any;
  results: IDistrict[];
}

export interface IMunicipalityMetropolitanResponse {
  count: number;
  next: any;
  previous: any;
  results: IMunicipalityMetropolitan[];
}

export interface IDistrictState {
  loading: boolean;
  districts: {
    [province_slug: string]: IMunicipalityMetropolitan[];
  }
  error: any;
}

export interface IMetropolitanState {
  loading: boolean;
  metropolitans: {
    [district_slug: string]: IMunicipalityMetropolitan[];
  }
  error: any;
}
