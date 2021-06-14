import React from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap/';
import Weather from './components/Weather'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityInfo:{},
      errorMsg: '',
      weatherData:'',
      displayErrorMsg: false,
      displayMap: false
    }
  }
  getCity=(event)=>{
    this.setState({
      city : event.target.value,
    });
  }
  getLocation = async (event) => {
    event.preventDefault();
    try{
      const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&city=${this.state.city}&format=json`)

      const apiRes = await axios.get(`${process.env.REACT_APP_URL}/weather-data`)

      this.setState({
        cityInfo: axiosResponse.data[0],
        weatherData:apiRes.data.data,
        displayMap:true,
        displayErrorMsg: false
      });
    }
    catch(error) {
      this.setState({
        errorMsg: 'Unable to geocode',
        displayErrorMsg: true

      });
    }
  }
    render(){
      return (
        <>
          <h1>City Explorer</h1>
          <Form onSubmit={this.getLocation}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Locations </Form.Label>
              <Form.Control placeholder="Enter location" onChange={this.updateFindQuery} />

            </Form.Group>
            <Button variant="primary" type="submit">
              Explor!
            </Button>
          </Form>

          {this.state.displayMap &&
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.318d7e351679b370b49a56a43771dcfc&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}`} />
              <Card.Body>
                <Card.Title>Locations</Card.Title>
                <Card.Text>
                  {this.state.cityInfo.display_name}
                </Card.Text>
                <Card.Text>Latitude:{this.state.cityInfo.lat}</Card.Text>
                <Card.Text>Longtutde:{this.state.cityInfo.lon}</Card.Text>

              </Card.Body>
            </Card>
          }
          {this.state.displayWeather &&
            <Weather weatherData={this.state.weatherData} />
          }


        </>
      );
    }
  }
    export default App;
