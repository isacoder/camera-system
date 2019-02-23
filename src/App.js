import React, { Component } from 'react';
import './App.css';
import logo from './assets/icons/logo.svg'
import searchIcon from './assets/icons/search.svg'
import sortIcon from './assets/icons/sorting.svg'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-logo">
            <img src={logo} alt='camera system logo' />
          </div>
        </header>
        <div className='container'>
          <div className='company-info'>
            <h1> Your Cameras</h1>
            <p>Total Devices: 9</p>
          </div>
          <div className='filters-group'>
            <div className='search-filter'>
              <input type='text' alt='search for devices' value='Search by device name or ID'/>
              <img src={searchIcon} alt='search icon'/>
            </div>
            <div className='toggle-filter'>
              <img src={sortIcon} alt='sort icon' />
            </div>
          </div>
          <div className='devices-gallery'>
            <div className='devices-group'>
              <div className='device-card'>
              </div>
              <div className='device-card'>
              </div>
              <div className='device-card'>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
