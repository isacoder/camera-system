import React from 'react';
import './Device.css'

export default ({ name, id, thumbnail, active }) => (
  <div className={`device-card ${active ? '' : 'inactive-card'}`}>
    <img src={thumbnail} width='50' height='50' alt= {name} />
    <div className='card-description'>
      <span className={`status-bar ${active ? ' active-bar' : 'inactive-bar'}`}></span>
      <p>
        <div className='status-text'>{active ? 'active' : 'inactive'}</div>
        <div clasName='name-text'>{name}</div>
      </p>
      <div className='id-text'> Id #{id}</div>
    </div>
  </div>
);
