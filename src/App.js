import React from 'react';

import Informationform from './components/formofinfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cardofinfo from './components/cardofinfo';
import WeatherCard from './components/weather';
import Movie from './components/movie';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      data2: '',
      display: false,
      show: false,
      weatherArr: [],
      rend: false,
      newmoive: [],

    }
  }
  setmovie = (movie) => {
    this.setState({
      newmoive: movie,
    })
    console.log('adfsa',this.state.newmoive);
  }



  setData = (data1, showing) => {
    this.setState({
      data2: data1,
      display: showing,
      show: true,
    })
  }

  setWeatherArr = (weatherData, showing) => {
    this.setState({
      weatherArr: weatherData,
      rend: showing,
    })
  }
  render() {
    return (
      <div>
        <Informationform setData={this.setData} setWeather={this.setWeatherArr} setmovie={this.setmovie} />
        {this.state.show &&
          <Cardofinfo data2={this.state.data2} display={this.state.display} />
        }
        {this.state.show === true &&
          <WeatherCard display={this.state.rend} weatherData={this.state.weatherArr} />}
        {this.state.show === true &&
          <Movie display={this.state.rend} setmovie={this.state.newmoive} />}
      </div>
    )
  }
}
export default App;
