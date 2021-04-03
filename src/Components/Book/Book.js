import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Data from '../../Data.json';
import './Book.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';


const Book = () => {

    const { bookId } = useParams();
    const singleRoom = Data.find(book => book.id == bookId);

    const [logInUser, setLogInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] =useState({

        checkIn :new Date(),
        checkOut :new Date()
        
    });

    const handleCheckInDate = (date) => {
        const newDates ={...selectedDate}
         newDates.checkIn=date;

        setSelectedDate(newDates);
    };

    const handleCheckOutDate = (date) => {
       
        const newDates ={...selectedDate}
         newDates.checkOut=date;
        setSelectedDate(newDates);
    };

    const handleBooking=()=>{

       const newUser={...logInUser,...selectedDate};

       fetch('http://localhost:4000/addBooking',{

       method:'POST',
       headers:{ 'Content-Type': 'application/json'},
       body:JSON.stringify(newUser)

       })
       .then( res => res.json())
       .then( result => {

        console.log(result);
       })
             
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Book Now</h1>
            <h3>Let's Book {singleRoom.roomName} </h3>
            <p>Want a <Link to="/home"> different room?</Link></p>



            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="secondary">
                 Book Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>

        </div>
    );
};

export default Book;