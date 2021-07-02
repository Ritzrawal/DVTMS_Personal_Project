const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  tokenName: 'token',
  roles: {
    SystemAdmin: 'SystemAdmin',
    CompanyAdmin: 'CompanyAdmin',
    CompanyUser: 'CompanyUser',
    BhansarAgent: 'BhansarAgent',
    ShowroomAdmin: 'ShowroomAdmin',
  },
  paging: {
    perPage: 25,
  },
  gender: {
    male: 'MALE',
    female: 'FEMALE',
    other: 'OTHER',
  }
};

export default config;
