import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import './Collection.css';
import Footer from '../../components/Footer';
import CardListerWindow from './CardLister/CardListerWindow';
import CardDetails from './CardLister/CardDetails';
import ProfileCard from '../../components/ProfileCard';

function Collection() {
  const [userCollection, setUserCollection] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newCardId, setNewCardId] = useState('');

  const fetchUserCollection = async () => {
    try {
      const response = await fetch(`https://pokemonappbackend.michaelrivera15.repl.co/collection`, {
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
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchUserCollection();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  const handleAddCardSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://pokemonappbackend.michaelrivera15.repl.co/collection/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ card_id: newCardId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewCardId('');
    } catch (error) {
      console.error('Error adding card: ', error);
    }
  };


  return (
    <div className="collection-container">
      <Navbar className="collection-navbar" />

      <div className="user-img left">
        <img src='./poke_profile.PNG' />
        <div className="user-info">
          <ul>
            <li><img className="user-pfp" src="poke_profile.PNG" alt="User" height="150px" /></li>
            <li>Name: {userCollection.user && userCollection.user.username}</li>
            <li>Email: {userCollection.user && userCollection.user.email}</li>
            <li>Phone: {userCollection.user && userCollection.user.phone}</li>
          </ul>
        </div>
      </div>

      <div className="user-cardinfo right">
        <div className="">
          <CardListerWindow cards={userCollection} onCardClick={handleCardClick} />
        </div>
      </div>

      <div className="add-card-form">
        <form onSubmit={handleAddCardSubmit}>
          <label>
            <input placeholder='Enter Card ID'
              type="text"
              value={newCardId}
              onChange={(e) => setNewCardId(e.target.value)}
            />
          </label>
          <button type="submit">Add Card</button>
        </form>
      </div>



      <Footer />
    </div>
  );
}

export default Collection;
