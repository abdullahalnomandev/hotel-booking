import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firbase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import './Login.css';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app();
}

const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [logInUSer, setLogInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        name: '',
        email: '',
        success: false,
        error: '',
    });
    const [newUser, setNewUser] = useState(false);
    //GoogleSignIn 
    const handleGoogleSignIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var { displayName, email } = result.user;
                const logInUSer = { name: displayName, email: email }
                setLogInUser(logInUSer);
                history.replace(from);
         
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var credential = error.credential;
                console.log(errorMessage, credential);
            });
    }
    // FB Sign In

    const handleFbSignIn = () => {

        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;

                var accessToken = credential.accessToken;
                var { displayName, email } = result.user;
                const loginUse = { name: displayName, email: email }
                setLogInUser(loginUse);
                history.replace(from);
                console.log(result.user);

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, credential);

            });

    }

    const handleBlur = (e) => {
        let isValid = true;

        if (e.target.name === "email") {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === "password") {
            isValid = e.target.value.length > 6;
        }

        if (isValid) {

            const loginUser = { ...user };
            loginUser[e.target.name] = e.target.value;
            setUser(loginUser);
        }

    }


    // Sign Up With e $ p
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const signUpUser = { name: displayName, email: email, success: true };
                    setUser(signUpUser);
                    updateUserProfile(user.name);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const userInfo = { ...user }
                    userInfo.success = false;
                    userInfo.error = errorMessage;
                    setUser(userInfo);
            
                });
        }
        // Log In With Number And Password

        if (!newUser && user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const userDetails = userCredential.user;
                    const userInfo = { ...user };
                    userInfo.error = '';
                    setUser(userInfo)
                    setLogInUser(userInfo);
                    history.replace(from);
                    console.log("user name is",userDetails);
                   
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const userInfo = { ...user }
                    userInfo.success = false;
                    userInfo.error = errorMessage;
                    setUser(userInfo);
                    console.log(errorCode, errorMessage);
                });

        }
        e.preventDefault();
    }

    //update User Profile
    const updateUserProfile = (name) => {

        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        })

        .then(function () {
            console.log("user Updated");
        })
        .catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div className="from">
            <div style={{ textAlign: 'center' }}>

                <form style={{ width: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupEmail">

                        {
                            newUser &&
                            <div>
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" onBlur={handleBlur} type="text" placeholder="Write Name" required />
                            </div>
                        }

                        <br />
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onBlur={handleBlur} type="text" placeholder="Enter email" required />

                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>

                        <Form.Control name="password" onBlur={handleBlur} type="password" placeholder="Password" required />
                    </Form.Group>
                    <input type="submit" onClick={() => setNewUser(false)} className="btn btn-warning" value="Log In" /><br /><br />
                    <input type="submit" onClick={() => setNewUser(true)} className="btn btn-warning" value="Sign Up" />
                </form>
                <p>Or</p>
                <button className="btn btn-success" onClick={handleGoogleSignIn}>Sign In With Google</button><br /><br />
                <button className="btn btn-primary" onClick={handleFbSignIn}>Sign In With Facebook</button>


                {
                    user.success && <h1 style={{ color: 'green' }}> Sign Up has been successFul.</h1>
                }
                <h3 style={{ color: 'red' }}>{user.error}</h3>

            </div>
        </div>
    );
};

export default Login;