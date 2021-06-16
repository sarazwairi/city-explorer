
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieArr: this.props.moviedata
        }
    }
    render() {
        return (
            <>
                <div>
                    <h1>MOVIES</h1>

                    <Container>
                        {this.props.moviedata.map((day, i) => (
                            <CardDeck>
                                <Card>
                                    {this.props.moviedata[i].image &&
                                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${this.props.moviedata[i].image}`} alt="" />
                                    }
                                    <Card.Body>
                                        <Card.Title>{this.props.moviedata[i].title}</Card.Title>
                                        <Card.Text>
                                            title:{this.props.moviedata[i].title}
                                        </Card.Text>
                                        <Card.Text>
                                            title:{this.props.moviedata[i].overview}
                                        </Card.Text>
                                        <Card.Text>
                                            title:{this.props.moviedata[i].popularity}
                                        </Card.Text>
                                        <Card.Text>
                                            title:{this.props.moviedata[i].date}
                                        </Card.Text>
                                        <Card.Text>
                                            title:{this.props.moviedata[i].avgvotes}
                                        </Card.Text>
                                        <Card.Text>
                                            title:{this.props.moviedata[i].votes}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                        ))}


                    </Container>
                </div>

            </>
        )
    }
}
export default Movies;