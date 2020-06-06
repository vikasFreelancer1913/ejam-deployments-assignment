import React, { useState, useEffect } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { post, get } from 'axios';
import { addDeployment } from '../../actions'; 

let isTemplateCalled = false;
function DeploymentAdd(props) { 
  const initialState = { name: '', url: '', version: '', deployedAt: '' }
  const [deployment, setFields] = useState(initialState) 
  const [templates, setTemplate] = useState(null) 
  const dispatch = useDispatch(); 
  useEffect(() => {
    if (!isTemplateCalled) {
      get('/api/templates').then(function(response) {
        if (response && response.data && response.data.length) {
          setTemplate(templates => ({ ...templates, templates: response.data }));
          isTemplateCalled = true;
        }
      })
      .catch(function(error) {
        console.log('Template Error: ', error);
      });
    }
  }, [templates]);
  
  function handleChange(event) { 
    setFields({...deployment, [event.target.name]: event.target.value});
  }

  function handleSubmit(event) { 
    event.preventDefault();
    if(!deployment.name || !deployment.url || !deployment.version ) {
      alert('All fields are mandatory!');
      return
    }

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timestamp = date + '|' + time; 
    post('/api/deployments', {name: deployment.name, url: deployment.url, version: deployment.version, deployedAt: timestamp})
      .then(function(response) {
        dispatch(addDeployment(response.data));
      })
      .then(function() {
        props.history.push("/")
      })
      .catch(function(error) { console.log(error); });    
  };

  function handleCancel() {
    props.history.push("/");
  }

  return (
    <div className="addFormWrapper">
      <h4>Add Deployment</h4>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <select name="name" onChange={handleChange} className="form-control">
            <option>Select a Template</option>
            {
              templates && templates.templates && templates.templates.length && templates.templates.map(function(item) {
                return (
                  <option value={item.name} key={item.name}>{item.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="form-group">
          <input type="text" name="url" required value={deployment.url} onChange={handleChange} className="form-control" placeholder="Template URL" />
        </div>
        <div className="form-group">
          <select name="version" onChange={handleChange} className="form-control">
            <option>Select a version</option>
            {
              templates && templates.templates && templates.templates.length && templates.templates[0].versions.map(function(item, index) {
                return(
                <option value={item} key={item}>{item}</option>
                )
              })
            }
          </select>
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DeploymentAdd;