import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';


const Bookings = () => {
 const [logInUser, setLogInUser] = useContext(UserContext);
 const [booking,setBooking]=useState([]);
console.log(booking);
useEffect(()=>{

    fetch('http://localhost:4000/bookingDetails?email='+logInUser.email,{

    method:'GET',
    headers:{
        'Content-Type':'application/Json',
        authorization:`Bearer ${sessionStorage.getItem('token')}`
    }
    })
    .then (res => res.json())
    .then ( result => setBooking(result))


},[])

    return (
        <div>
            <h3>You have {booking.length} book..</h3>
            
            {
                booking.map(book => <h4 key={book._id}>  Name: {book.name} (form){new Date(book.checkIn).toDateString('dd/MM/yyyy')} (To) {new Date(book.checkOut).toDateString('dd/MM/yyy')}</h4>)
            }
        </div>
    );
};

export default Bookings;