export interface IImportingLocationPagingInput {
    count?:number;
    limit?: number;
    offset?: number;
  }

  export interface IImportingLocation {
      uuid:string;
      province:string;
      title:string;
      title_nepali:string;
      location:string;
      location_nepali:string;
      detail:string;
      is_active:string
  }