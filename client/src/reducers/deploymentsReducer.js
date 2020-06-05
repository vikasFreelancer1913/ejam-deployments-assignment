import { SET_DEPLOYMENTS, ADD_DEPLOYMENT, REMOVE_DEPLOYMENT } from '../actions';

const initialState = { deployments: [] }
export default function deploymentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEPLOYMENTS:
      return action.deployments;
    case ADD_DEPLOYMENT:
      return [action.deployment, ...state];
    case REMOVE_DEPLOYMENT:
      return state.filter(deployment => deployment._id !== action._id);
    default:
      return state;
  }
}