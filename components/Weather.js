import React from 'react'; 
import Card from 'react-bootstrap/Card'

class Weather extends React.Component{
    render(){
        return(
            <div>
                     <Card style={{ width: '20rem', height:'35rem' }}>
          <Card.Body>
            <Card.Title>Weather</Card.Title>
            {this.props.weatherData.map((item,indx) => (
              <Card.Text key={indx}>
                day: {item.date}
                description: {item.description}

              </Card.Text>
            ))}
             <Card.Text>
              {this.props.weatherData.data}
            </Card.Text>

          </Card.Body>
        </Card>

            </div>
        )
    }
}
export default Weather;