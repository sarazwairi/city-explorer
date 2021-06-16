
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather';
import Movies from './components/movie';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';




export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      citydata: '',
      err: '',
      lat: '',
      lon: '',
      weatherArr: [],
      movieArr: [],
      mapshow: false,
      weathershow: false,
      mpvieShow: false,
      errmsg: false,
    }
  }

  city = async (e) => {
    // e.preventDefault();
    let server = process.env.REACT_APP_SERVER;
    let url = `https://us1.locationiq.com/v1/search.php?key=pk.f5b36af51f5dd4d50454aa00a95c7ec2&q=${e}&format=json`;

    try {
      let results = await axios.get(url);
      this.setState({
        citydata: results.data[0],
        mapshow: true,
        errmsg: false,
        lat: results.data[0].lat,
        lon: results.data[0].lon,
      })
    }
    catch (error) {
      this.setState({
        mapshow: false,
        errmsg: true,
        err: error,

      })
    }


    try {
      let weatherdata = await axios.get(`${server}/weather?city=${e}`);
      this.setState({
        weatherArr: weatherdata.data,
        weathershow: true,
      })
      console.log(weatherdata);
    } catch (error) {
      this.setState({
        weatherArr: error.response,
        weathershow: false,
      })
    }



    try {
      let moviedata = await axios.get(`${server}/movie?city=${e}`);
      this.setState({
        movieArr: moviedata.data,
        movieshow: true,
      })
      console.log(moviedata.data);
    } catch (error) {
      this.setState({
        movierArr: error.message,
        movieshow: false,
      })
    }
  }

  newSearchQuery = async (e) => {
     e.preventDefault();

    this.city(e.target.cityname.value);
  }


  render() {
    return (
      <div>
        <h1>CITY EXPLORER</h1>
        <Form onSubmit={this.newSearchQuery}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>type city name</Form.Label>
            <Form.Control type="text" placeholder="city name" name="cityname" />
          </Form.Group>

          <Button variant="primary" type="submit">
            EXPLORE!
          </Button>
        </Form>

        {this.state.mapshow &&
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.f5b36af51f5dd4d50454aa00a95c7ec2&center=${this.state.citydata.lat},${this.state.citydata.lon}`} />
              < Card.Body >
          <Card.Title>{this.state.citydata.display_name}</Card.Title>
          <Card.Text>
            {/* Some quick example text to build on the card title and make up the bulk of
            the card's content. */}
          </Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup>{this.state.citydata.lat}</ListGroup>
            <ListGroup>{this.state.citydata.lon}</ListGroup>
          </ListGroup>
        </Card.Body>
          </Card>
        }

        {this.state.errmsg && 
        <div>{this.state.err.response.status}
        </div>}
        {this.state.weathershow && <Weather weatherdata={this.state.weatherArr}/>}
        {this.state.movieshow && <Movies moviedata={this.state.movieArr}/>}



      </div>
    );
  }
  }

  export default App;