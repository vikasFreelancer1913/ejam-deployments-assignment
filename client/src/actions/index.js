import { get } from 'axios';

export const SET_DEPLOYMENTS = 'SET_DEPLOYMENTS';
export const ADD_DEPLOYMENT = 'ADD_DEPLOYMENT';
export const REMOVE_DEPLOYMENT = 'REMOVE_DEPLOYMENT';

export function setDeployments() {
  return function(dispatch) {
    return get('/api/deployments')
      .then(function(response) {
        dispatch({type: SET_DEPLOYMENTS, deployments: response.data})
      })
      .catch(function(error) { console.log('error', error); });
  };
};

export function addDeployment(deployment) {
  return {
    type: ADD_DEPLOYMENT,
    deployment: deployment,
  };
};

export function removeDeployment(_id) {
  return {
    type: REMOVE_DEPLOYMENT,
    _id: _id,
  };
};
