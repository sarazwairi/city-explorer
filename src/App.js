import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: '',
      errorMsg: '',
      displayErrorMsg: false,
      displayMap: false
    }
  }
  getLocation = async (event) => {
    event.preventDefault();
    let searchQuery1 = event.target.searchQuery.value;
    let loactionURL = `https://eu1.locationiq.com/v1/search.php?key=pk.f5b36af51f5dd4d50454aa00a95c7ec2&q=${searchQuery1}&format=json`;
    try {
      let locationResult = await axios.get(loactionURL);
      this.setState({
        locationData: locationResult.data[0],
        displayMap: true
      })
    }
    catch {
      this.setState({
        errorMsg: 'Unable to geocode',
        displayErrorMsg: true
      })
    }
  }
    render(){
      return (
        <div>
          <h1>city explorer</h1>
          <form onSubmit={this.getLocation}>
            <input type='tesxt' placeholder='location name' name='searchQuery' />
            <input type='submit' value='Explore!' />
          </form>
          <p>{this.state.locationData.display_name}</p>
          <p>{this.state.locationData.lon}</p>
          <p>{this.state.locationData.lat}</p>
          {this.state.displayMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt='map' />}
          <br/>
          {this.state.displayErrorMsg && this.state.errorMsg}
        </div>
      )
    }
  }
  export default App;