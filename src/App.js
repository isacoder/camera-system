import React, { Component } from 'react';
import './App.css';
import logo from './assets/icons/logo.svg'
import searchIcon from './assets/icons/search.svg'
import Device from './Components/Device';
import deviceNames from './assets/json/sample-devices.json';
import deviceStatus from './assets/json/sample-status.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: 'asc', // 'asc', 'desc'
      groupBy: 'none', // 'none', 'status'
      filterText: '',
      devices: [],
      visibleDevicesIds: [],
    };
  }

  componentDidMount() {
    const visibleDevicesIds = [];
    const devices = deviceStatus.status.map((device) => {
      const result = deviceNames.devices.find((deviceName) => {
        return deviceName.id === device.deviceId
      });
      visibleDevicesIds.push(device.deviceId);
      return {
        id: device.deviceId,
        active: !!device.active,
        thumbnail: device.thumbnail,
        name: (result && result.name) || '',
      };
    });

      this.setState({ devices, visibleDevicesIds });
    }


    sortDevicesByName = (devices) => {
      const sortedDevices = devices.slice();
      const { sortOrder } = this.state;
      sortedDevices.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
      if ( sortOrder === 'desc' ) {
        sortedDevices.reverse();
      }
      return sortedDevices;
    }

    setSortOrder = () => {
      const { sortOrder } = this.state;
      let newSortOrder = '';

      if (sortOrder === 'desc') {
        newSortOrder = 'asc';
      } else {
        newSortOrder = 'desc';
      }

      this.setState({ sortOrder: newSortOrder });
    }

    setGroupBy = () => {
      const { groupBy } = this.state;
      let newGroupBy = '';
      if (groupBy === 'status') {
        newGroupBy = 'none';
      } else {
        newGroupBy = 'status';
      }

      this.setState({ groupBy: newGroupBy });
    }

    filterByText = () => {
      const { filterText, devices } = this.state;
      const filteredDevices = devices.filter((device) => {
        return device.name.toLowerCase().includes(filterText.toLowerCase());
      });
      const visibleDevicesIds = filteredDevices.map((device) => device.id);
      this.setState({ visibleDevicesIds });
    }


    renderDevice(device) {
      return (
        <Device
          key={device.name + device.id}
          name={device.name}
          id={device.id}
          thumbnail={device.thumbnail}
          active={device.active}
        />
      );
    }


    renderDevices() {
      const devices = this.state.visibleDevicesIds.map((id) => {
        return this.state.devices.find((device) => {
          return device.id === id;
        });
      });
      const sortedDevices = this.sortDevicesByName(devices);
      if (this.state.groupBy === 'none') {
        return (
          <ul>{sortedDevices.map(this.renderDevice)}</ul>
        );
      } else {
        const active = [];
        const inactive = [];
        sortedDevices.forEach((device) => {
          if (device.active) {
            active.push(device);
          } else {
            inactive.push(device);
          }
        });
        return (
          [
            <ul key='active-devices'>{active.map(this.renderDevice)}</ul>,
            <ul key='inactive-devices'>{inactive.map(this.renderDevice)}</ul>,
          ]
        )
      }
    }

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
              <p>Total Devices: {this.state.devices.length}</p>
            </div>
            <div className='filters-group'>
              <div className='search-filter'>
              <input type='text' alt='search for devices' placeholder='Search by device name or ID' value={this.state.filterText} onChange={
                (event) => {
                  this.setState({ filterText: event.target.value }, () => {
                    this.filterByText();
                  });
                }
              } />
            <div className='search-icon'>
              <img src={searchIcon} alt='search icon'/>
            </div>
          </div>
          <div className='toggle-filter'>
            <button onClick={() => this.setSortOrder() }>Sort By Name [{this.state.sortOrder}]</button>
            <button onClick={() => this.setGroupBy() }>Group By [{this.state.groupBy}]</button>

          </div>
        </div>
        <div className='devices-gallery'>
          {this.renderDevices()}
        </div>
      </div>

    </div>
    );
  }
}

export default App;
