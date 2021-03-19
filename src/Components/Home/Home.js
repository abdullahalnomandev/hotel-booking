import React, { useEffect, useState } from 'react';
import Data from '../../Data.json';
import Room from '../Room/Room';

const Home = () => {

    const [data,setData]=useState([]);
   
    useEffect(()=>{

        setData(Data);

    },[])
    console.log('data',data);

    return (
        <div>
          <div className="container">
              <div className="row">
              {
                data.map( room => <Room room={room} />)
            }
              </div>
          </div>
       
        </div>
    );
};

export default Home;