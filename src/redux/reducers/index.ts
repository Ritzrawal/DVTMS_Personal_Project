import { combineReducers } from 'redux';
import auth from './auth';
import ui from './ui';
import vehicleEntries from './vehicleEntry';
import users from './user';
import documentUpload from './documentUpload';
import patchVehicle from './vehiclePatch';
import districts from './district';
import metropolitans from './metropolitan';

export default combineReducers({
  auth,
  ui,
  vehicleEntries,
  users,
  documentUpload,
  patchVehicle,
  districts,
  metropolitans,
});
