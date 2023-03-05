
import React from 'react';
import { useMemo } from 'react';
import{GoogleMap, useLoadScript,Marker} from "@react-google-maps/api";
import beachimg from './images/beach.jpg'; // Tell Webpack this JS file uses this image

const ourApp= {
    name: 'LoMap',
    group:'3B',
    lab:'ASW-En-L.3',
    groupMembers:['Manu','Juan','Sebastian','Sara'],

};

const containerStyle = {
  width: '1000px',
  height: '600px'
};

export function App() {
  return (
      <div className="intro">
        <h1>Welcome to {ourApp.name}!</h1>

        <p className="summary">
          This is our first mock in react!:)
        </p>
      </div>
  );
}

export default function First(){

  const{isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDJkJ4juXNSUSO4JSi76lmz2NJqyc0gbRE",
  });

  if(!isLoaded) return <div>Loading...</div>
  return <Map />
  
  
}

function Map(){
  return (<GoogleMap zoom={10} center={{lat : 41.3623 , lng : -5.8485}}   mapContainerStyle={containerStyle} >

    <Marker position={{lat : 41.3623 , lng : -5.8485}} />

  </GoogleMap>);
}
