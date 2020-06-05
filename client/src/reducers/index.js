import { combineReducers } from 'redux';
import deployments from './deploymentsReducer';
// import deployment from './deploymentReducer';

export default combineReducers({
  deployments: deployments
});