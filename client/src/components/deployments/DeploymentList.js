import React, { useState } from 'react';
import { useSelector,  useDispatch } from 'react-redux';      
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { removeDeployment } from '../../actions';

function DeploymentList(props) {
  const [showConfirm, showConfirmDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const deployments = useSelector(function(state) { return state.deployments }); 
  const dispatch = useDispatch();
  
  function handleDelete(_id) {
    showConfirmDialog(true);
    setDeleteItem(_id);
  }

  function deleteTheDeployment() {
    showConfirmDialog(false);
    if (deleteItem !== null) {
      axios.delete(`/api/deployments/${deleteItem}`)
          .then(function() {
            dispatch(removeDeployment(deleteItem));
            props.history.push("/")
          })
          .catch(function(error) { console.log('error', error) });
    }
  }

  function cancleDelete() {
    showConfirmDialog(false);
    setDeleteItem(null);
  }

  return ( 
    <div className="listWrap">
      {
        showConfirm && 
        <div className="confirmBoxOuter">
          <div className="confirmBoxInner">
            <p>Are you sure you want the delete the Deployment?</p>
            <div className="actionsWrap">
              <button className="btn yesBtn btn-secondary" onClick={deleteTheDeployment}>Yes</button>
              <button className="btn noBtn btn-primary" onClick={cancleDelete}>No</button>
            </div>
          </div>
        </div>
      }
      <h2>
        Deployments
        <Link to="/deployments/new" className="btn btn-primary float-right">Create Deployment</Link> 
      </h2>
      <hr/>
      {
        deployments && deployments.length ?
        <div>
          <table className="deploymentTable">
            <thead>
              <tr>
                <th>
                  Template Name
                </th>
                <th>
                  URL
                </th>
                <th>
                  Version
                </th>
                <th>
                  Deployed At
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {deployments && deployments.length > 0 && deployments.map(function(deployment) { 
                return (
                  <tr key={ deployment._id }> 
                    <td>{deployment.name}</td> 
                    <td>{deployment.url}</td>
                    <td>{deployment.version}</td>
                    <td>{deployment.deployedAt}</td>
                    <td className="actions">
                      <button onClick={() => handleDelete(deployment._id)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> 

          <div className="dataForMobile">
              <ul>
                {deployments && deployments.length > 0 && deployments.map(function(deployment) { 
                  return (
                    <li key={ deployment._id }> 
                      <p><span>Template name: </span>{deployment.name}</p> 
                      <p><span>URL: </span>{deployment.url}</p>
                      <p><span>Version: </span>{deployment.version}</p>
                      <p><span>Deployed At: </span>{deployment.deployedAt}</p>
                      <p className="actions">
                        <button onClick={() => handleDelete(deployment._id)}><FaTrashAlt /> Delete</button>
                      </p>
                    </li>
                  );
                })}
              </ul>
          </div>
        </div>
        :
        <p className="noDataMessage">No deployment at present. Proceed and <Link to="/deployments/new">Create Deployment</Link></p>
      }
    </div>
  )
}

export default DeploymentList;