import config from "./";
import routes from "./routes";

const roles = config.roles;

const bhansarAgent: string[] = [
  routes.vehicleEntry.path,
  routes.newVehicleEntry.path,
  routes.dashboard.path,
  routes.resetPassword.path,
];

const systemAdmin: string[] = [
  routes.vehicleEntry.path,
  routes.newVehicleEntry.path,
  routes.dashboard.path,
  routes.verifiedList.path,
  routes.naamSari.path,
  routes.unverifiedList.path,
  routes.unverfiableList.path,
  routes.newUser.path,
  routes.users.path,
  routes.resetPassword.path,
  routes.analytics.path,
];

const companyAdmin: string[] = [
  routes.vehicleEntry.path,
  routes.newVehicleEntry.path,
  routes.dashboard.path,
  routes.verifiedList.path,
  routes.unverifiedList.path,
  routes.unverfiableList.path,
  routes.resetPassword.path,
  routes.analytics.path,
  routes.naamSari.path,
];

const companyUser: string[] = [
  routes.vehicleEntry.path,
  routes.newVehicleEntry.path,
  routes.dashboard.path,
  routes.resetPassword.path,
];

const showRoomAdmin: string[] = [
  routes.vehicleEntry.path,
  routes.newVehicleEntry.path,
  routes.dashboard.path,
  routes.verifiedList.path,
  routes.unverifiedList.path,
  routes.unverfiableList.path,
  routes.resetPassword.path,
  routes.analytics.path,
  routes.naamSari.path,
];

interface IAuthorization {
  [key: string]: string[];
}

const authorization: IAuthorization = {
  [roles.BhansarAgent]: bhansarAgent,
  [roles.SystemAdmin]: systemAdmin,
  [roles.CompanyAdmin]: companyAdmin,
  [roles.CompanyUser]: companyUser,
  [roles.ShowroomAdmin]: showRoomAdmin,
};

export default authorization;
