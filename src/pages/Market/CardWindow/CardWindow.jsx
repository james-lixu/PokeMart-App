import React, { useState } from 'react';
import Card from './Card';
import CardModal from './CardModal';
import './CardWindow.css';

const CardWindow = ({ cards }) => {
  const listing = cards || [];

  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card) => {
    console.log('CardWindow: card clicked:', card); // Log the clicked card
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  // Debugging: Log the render process and key variables
  // console.log('CardWindow: rendering with', listing.length, 'cards');
  // if (selectedCard) {
  //   console.log('CardWindow: selectedCard details:', selectedCard);
  // }

  return (
    <div id='card-results'>
      {listing.length === 0 && <p>Search to display cards</p>} {/* Display a message if no cards are present */}
      {listing.map((card, index) => {
        console.log(`CardWindow: rendering card at index ${index}`, card); // Log each card being rendered
        return <Card key={card.id} card={card} onCardClick={handleCardClick} />;
      })}
      <div className={`modal ${isModalOpen ? 'modal-visible' : ''}`} onClick={handleCloseModal}>
        <CardModal card={selectedCard} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default CardWindow;
