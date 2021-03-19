import React from 'react';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = (props) => {
    const {id,roomName,img,description,amount}=props.room;
    return (
        <div className="col-md-4 mt-5">
             <Card >
                <Card.Img style={{height:"270px"}}  variant="top"src={img} />
                <Card.Body >
                    <Card.Title>{roomName}</Card.Title>
                    <Card.Text>
                        {description}
                      </Card.Text>
                     <div className="text-center">
                     <span className="mr-5"> $ {amount}</span>
                    <Button  as={Link} to={`/book/${id}`} variant="primary">Book</Button>
                     </div>
                </Card.Body>
                
            </Card>
        </div>
    );
};

export default Room;