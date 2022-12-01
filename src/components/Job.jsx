import React, { useState } from 'react';
import { render } from 'react-dom';
import { ACTIONS } from './NewApplication.jsx';
import { useInput } from '../hooks.js'
import UpdateApplication from './UpdateApplication.jsx'
// import { Navigate, useNavigate } from 'react-router-dom';
// PROPS.JOB = JOB

export default function Job ({ job, dispatch }) {
  const [status, statusOnChange, resetStatus] = useInput('');

  const updateStatus = () => {
    fetch(`/jobs/${job.job_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({newStatus: status})
    })
    .then(response => response.json())
    .then(data => {
      // data get back is object of job details
      // call dispatch
      dispatch({type:ACTIONS.UPDATE_STATUS, payload: { newStatus: data.status, id: job.job_id}})
    })
    .catch(()=>console.log('couldnt fetch patch request'));
    resetStatus();
    const updateField = document.querySelector('#update-field' + job.job_id);
    updateField.style.display = 'none';
  }

  const deleteApp = () => {
    // when this button is click, the application needs to be removed from the user's jobList in database
    // also needs to be removed from table
    dispatch({ type: ACTIONS.DELETE_APP, payload: { id: job.job_id } });
    fetch(`/jobs/${job.job_id}`, {
      method: 'DELETE'
    })
      .then(response => console.log(response));
  };

  function renderUpdateBox(job) {
    // render the update application div
    render(<UpdateApplication job={job}/>, document.getElementById('updateDiv'));
  }

  console.log(job);
  
  return (
    <tr>
      <td>{job.job_role}</td>
      <td>{job.company_name}</td>
      <td>{job.email}</td>
      <td>{job.phone}</td>
      <td>{job.contact_name}</td>
      <td>{job.job_link}</td>
      <td>{job.status}</td>
      <td>
        <button className='update-button' onClick={() => renderUpdateBox(job)}>Update Application</button>
      </td>
      <td>
        <button className='delete-button' onClick={deleteApp}>Delete</button>
      </td>
      
    </tr>
  );
};
