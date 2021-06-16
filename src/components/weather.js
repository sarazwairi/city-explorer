
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';


class Weather extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         weatherArr: this.props.weatherdata
    //     }
    // }
    render() {
        return (
            <>
                <h1>WEATHER</h1>
                    <div>
                        {this.props.weatherdata.map((day, i) => (
                            <ListGroup>
                                <ListGroup.Item>day:{i}</ListGroup.Item>
                                <ListGroup.Item>date:  {day.date}</ListGroup.Item>
                                <ListGroup.Item>description:{day.description}</ListGroup.Item>
                            </ListGroup>
                        ))
                        }
                    </div>
                
                
                
            </>
        )
    }
}

export default Weather;