
import React from 'react';
import beachimg from './images/beach.jpg'; // Tell Webpack this JS file uses this image

const ourApp= {
    name: 'LoMap',
    group:'3B',
    lab:'ASW-En-L.3',
    groupMembers:['Manu','Juan','Sebastian','Sara'],

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
    return (
            <section>
            <h2>{ourApp.name} Info</h2>
<p>        <img
                // Import  the actual jpg
                src= {beachimg} //equivalent to writing src={require('../public/beach.jpg'}
                alt="A place to pin in lomap"
            />
</p>
                <h3>Group members</h3>
            <ul>
                <li>{ourApp.groupMembers[0]}</li>
                <li>{ourApp.groupMembers[1]}</li>
                <li>{ourApp.groupMembers[2]}</li>
                <li>{ourApp.groupMembers[3]}</li>
            </ul>

            </section>
    );
}
