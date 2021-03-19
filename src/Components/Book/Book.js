import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Data from '../../Data.json';
import './Book.css';

const Book = () => {

    const { bookId } = useParams();
    const singleRoom = Data.find(book => book.id == bookId);

    const [logInUser,setLogInUser]=useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data); 



    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Book Now</h1>
            <h3>Let's Book {singleRoom.roomName} </h3>
            <p>Want a <Link to="/home"> different room?</Link></p>
            <div className="form" >
                <form   onSubmit={handleSubmit(onSubmit)}>

                    <input name="name" defaultValue={logInUser.name} ref={register({ required: true })} placeholder="Write your Full Name"/> <br/>
                    {errors.name && <span>Name field is required</span>} <br/>

                    <input name="email" defaultValue={logInUser.email} ref={register({ required: true })} placeholder="Write your email"/> <br/>
                    {errors.email && <span>E-mail field is required</span>} <br/>

                    <input name="phone" ref={register({ required: true })} placeholder="Write your phone" /> <br/>
                    {errors.phone && <span >Phone Number field is required</span>} <br/>

                    
                    <input name="address"  ref={register({ required: true })} placeholder="Write your address" /> <br/>
                    {errors.address && <span>Address Number field is required</span>} <br/>
              

                    {/* <button className="btn btn-success">Submit</button> */}
                    <input className="submit" type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    );
};

export default Book;