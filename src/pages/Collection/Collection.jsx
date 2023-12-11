import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Collection.css';
import CardListerWindow from './CardLister/CardListerWindow';
import SellingCardWindow from './CardLister/SellingCardWindow';
import CardListerModal from './CardLister/CardListerModal';
import ProfIcon from '../../assets/images/poke_profile.png';


function Collection() {
  const [userCollection, setUserCollection] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newCardId, setNewCardId] = useState('');
  const [displayType, setDisplayType] = useState('collection'); // 'collection' or 'forSale'
  const [sellingCards, setSellingCards] = useState([]);

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

  const fetchCardsBeingSold = async () => {
    try {
      const response = await fetch(`https://pokemonappbackend.michaelrivera15.repl.co/collection/view_selling`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cards being sold: ', error);
      return [];
    }
  };

  useEffect(() => {
    fetchUserCollection(); // Fetch user's collection when the component mounts

    if (displayType === 'forSale') {
      fetchCardsBeingSold().then((sellingCardsData) => {
        // Handle the selling cards data, you might want to set it in state
        setSellingCards(sellingCardsData);
      });
    }
  }, [displayType]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDisplayTypeChange = (type) => {
    setDisplayType(type);
  };

  const totalValue = userCollection.data && userCollection.data.length > 0
    ? userCollection.data.reduce((acc, card) => acc + (card.price || 0), 0)
    : 0;
  const numberOfCards = userCollection.data ? userCollection.data.length : 0;

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
      fetchUserCollection();
    } catch (error) {
      console.error('Error adding card: ', error);
    }
  };
  

  return (
    <div className="collection-container">
      <Navbar className="collection-navbar" />

      <div className='collection-content'>
        <div className="tab-group">
          {/* Buttons to switch between "My Collection" and "Cards Being Sold" */}
          <button onClick={() => handleDisplayTypeChange('collection')}>My Collection</button>
          <img src={ProfIcon} alt="Collection Profile"/>
          <button onClick={() => handleDisplayTypeChange('forSale')}>My Cards For Sale</button>
        </div>
        
        {/* Display section based on the selected tab */}
        <div>
          
          {displayType === 'collection' ? (
            <div className='collection-header'>
              <div>
                <h3>Collection Value: ${totalValue.toFixed(2)}</h3>
              </div>
              <div>
                <h1>Card Collection</h1>
              </div>
              <div>
                <h3># of Cards: {numberOfCards}</h3>
              </div>
            
          {/*Move add-card-to-collection to where user buys card from market*/}
              {/* <div className="add-card-form">
                <form onSubmit={handleAddCardSubmit}>
                  <label>
                    <input
                      placeholder='Enter Card ID'
                      type="text"
                      value={newCardId}
                      onChange={(e) => setNewCardId(e.target.value)}
                    />
                  </label>
                  <button type="submit">Add Card</button>
                </form>
              </div> */}
            </div>
          ) : (
            <div className='collection-header'>
              <h1>Cards Being Sold<br/><h4>Adjust your prices or cancel listings</h4></h1>
            </div>
          )}
          
        </div>
  
          {displayType === 'collection' ? (
            // Display the user's card collection
            <CardListerWindow cards={userCollection} onCardClick={handleCardClick} />
          ) : (
            // Display the cards user is currently selling
            <SellingCardWindow cards={sellingCards} onCardClick={handleCardClick} setSellingCards={setSellingCards} fetchCardsBeingSold={fetchCardsBeingSold}/>
          )}
  
          {/* Render CardListerModal only when displayType is 'collection' */}
          {displayType === 'collection' && selectedCard && (
            <div className="for-sale-section">
              <CardListerModal card={selectedCard} onClose={() => setSelectedCard(null)} />
            </div>
          )}
        </div>
      
      <Footer />
    </div>
  );
}

export default Collection;
