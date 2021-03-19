import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './header.css';

const Header = () => {

    
  const [logInUser,setLogInUser]=useContext(UserContext);

    return (
        <div style={{backgroundColor:'blue',padding:'16px'}}>
            <Nav  className="justify-content-center header" activeKey="/home">
                <Nav.Item >
                    <Link to="/home">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/login">LogIn</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/book">Book</Link>
                </Nav.Item>
                <button onClick={()=>setLogInUser('')} className="btn btn-danger ml-5">Log Out</button>
            </Nav>
        </div>
    );
};

export default Header;