import React from 'react';
import { Form, Button } from 'react-bootstrap/';
import axios from 'axios';


let serverRoute = process.env.REACT_APP_SERVER;


class Informationform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newcity: '',
            locationReslut: '',

        }
    }

    updateCity = event => {
        this.setState({
            newcity: event.target.value,
        })
    }
    updateform = async (event) => {
        event.preventDefault();

        let url = `https://eu1.locationiq.com/v1/search.php?key=pk.aa88f8f51366daa6b9549e2ef1a7466f&q=${this.state.newcity}&format=json`;
        try {

            let response = await axios.get(url);
            this.setState({
                locationReslut: response.data[0],

            })
            this.props.setData(this.state.locationReslut, true);
        }
        catch (error) {
            console.log(error.response);
            this.props.setData(error, false)
        }
        try {
            console.log(serverRoute);
            let weatherData = await axios.get(`${serverRoute}/weather?searchQuery=${this.state.newcity}&long=${this.state.locationReslut.lon}&lat=${this.state.locationReslut.lat}`);
            // console.log(weatherData);
            this.props.setWeather(weatherData.data, true);
        }
        catch (error) {
            console.log(error.response);
            this.props.setWeather(error.response, false);
        }

        let movieurl = `${serverRoute}/movie?searchQuery=${this.state.newcity}`;

        axios
            .get(movieurl)
            .then(value => {
                this.props.setmovie(value.data);
                console.log(value.data);
            })
            .catch(error => {
                console.log(error.response);
                this.props.setmovie(error.response);

            })

    }

    render() {
        return (
            <div>
                <Form onSubmit={this.updateform}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><h2>City Explorer</h2></Form.Label>
                        <Form.Control type="text" placeholder="your city" onChange={this.updateCity} />

                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Explore
  </Button>
                </Form>
            </div>
        )
    }
}

export default Informationform;