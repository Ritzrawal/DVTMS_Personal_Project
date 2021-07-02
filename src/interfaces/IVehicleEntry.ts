import { IPaging } from "./IPaging";

export interface IVehicleWeightCapacity {
  total_weight: number;
  lifting_capacity: number;
  no_of_seat: number;
}

export interface IAddress {
  province: string;
  district: string;
  municipality_metropolitan: string;
  province_slug: string;
  district_slug: string;
}

export interface IVehicle {
  uuid: string;
  chassis_number: string;
  engine_number: string;
  color: string;
  engine_capacity: string;
  model: string;
  remarks: string;
  engine_capacity_unit: string;
  model_number: string;
  number_of_cylinder: number;
  fuel_type: string;
  electronic_equipment: null | string[];
  weight_capacity: null | IVehicleWeightCapacity;
  active_location: string;
  bhansar_payment: null | string;
  address: IAddress;
  father_or_husband: string;
  vehicle_type: string;
  use: string;
  bhansar_offie_name: string;
  entry_proof?: {
    proof_grant_office_name:string;
    entry_no:string;
  };
  entry_permission?: { 
    entry_grant_police_office:string;
    entry_grant_date: string; 
    entry_no: string;
  },
  other_proofs?: { 
    other_proofs:string 
  }
}

export interface IVehicleEntry {
  results: any;
  uuid: string;
  registration_number: string;
  registration_date: string;
  registered_by: string;
  manufactured_year: string;
  pargayapan_number: string;
  no_of_import: string;
  vehicles: IVehicle[];
}

export interface IVehicleEntryResponse {
  count: number;
  next: any;
  previous: any;
  results: any;
}

export interface IVehicleEntryUpdate {
  uuid: string;
  registration_number: string;
  registration_date: string;
  registered_by: string;
  manufactured_year: string;
  pargayapan_number: string;
  no_of_import: number;
  vehicles: IVehicle[];
}

export interface IVehiclePagingInput {
  limit?: number;
  offset?: number;
  created_at?: string;
  registered_at?: string;
}

export interface IVehiclePagingInputFilter {
  limit?: number;
  offset?: number;
  filter?: string;
}

export interface ISingleVehicleQueryInput {
  uuid: string;
}

export interface IVehicleEntryState {
  listLoading: boolean;
  paging: IPaging;
  entries: IVehicleEntry[];
  error: any;
  vehiclesById: {
    [tempUuid: string]: IVehicleDataInput,
  };
  allVehicles: string[];
}

export interface IVehicleInput {
  chassis_number: string;
  engine_number: string;
  color: string;
  engine_capacity: number;
  model: string;
  remarks: string;
}

export interface IVehicleDataInput extends IVehicleInput {
  key: string;
}

export interface IVehicleEntryInput {
  manufacturer_company: string;
  importing_group: string;
  status: string;
  gyapan_patra_number: string;
  bhansar_rasid_number: string;
  organization_name: string;
  manufactured_year: string;
  number_of_imports: number;
  vehicles: IVehicleInput[];
  registered_at: string;
  files: string[];
}

export interface IVehicleEntryUpdate {
  uuid: string;
  payload:{
    chassis_number?:string;
    files?:string[]
  }
}

export interface IVehiclePartialInput {
  chassis_number?: string;
  engine_number?: string;
  color?: {
    body_colour:string; 
    glass_color: string;
  },
  engine_capacity?: string;
  model?: string;
  remarks?: string;
  engine_capacity_unit?: string;
  address: IAddress;
  father_or_husband: string;
  model_number?: string;
  number_of_cylinder?: number,
  fuel_type?: string;
  electronic_equipment?: string;
  weight_capacity?: { 
    total_weight:number, lifting_capacity:number , no_of_seat:number
  },
  active_location?: string;
  bhansar_payment?: null;
  entry_proof?: {
    proof_grant_office_name:string;
    entry_no:string;
  };
  entry_permission?: { 
    entry_grant_police_office:string;
    entry_grant_date: string; 
    entry_no: string;
  },
  other_proofs?: { 
    other_proofs:string 
  }
}
