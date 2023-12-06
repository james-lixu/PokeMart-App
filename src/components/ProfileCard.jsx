import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import CardIcon from '../assets/images/cardIcon.png';

const ProfileCard = () => {
  const [userCollection, setUserCollection] = useState(null);

  useEffect(() => {
    const fetchUserCollection = async () => {
      try {
        const response = await fetch('https://pokemonappbackend.michaelrivera15.repl.co/collection', {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserCollection(data);
      } catch (error) {
        console.error('Error fetching user collection: ', error);
      }
    };

    fetchUserCollection();
  }, []);

  return (
    <div className="user-img">
      <div className="user-info">
        {userCollection ? (
          <ul>
            <li><img className="user-pfp" src={CardIcon} alt="User" /></li>
            <li> Hello, {userCollection.user && userCollection.user.username}</li>
          </ul>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
