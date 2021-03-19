import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login/Login';
import Book from './Components/Book/Book';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext=createContext();

function App() {

  const [logInUser,setLogInUser]=useState({});

  return (
    <UserContext.Provider value={[logInUser,setLogInUser]}>
      <Router>
        <h3>Welcome, {logInUser.name}</h3>
        <Header />
        <Switch>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          
          <PrivateRoute path="/book/:bookId">
            <Book />
          </PrivateRoute>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="*">
            <h1 style={{color:'red',textAlign:'center'}}> 404--NOT FOUND</h1>
          </Route>

        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
