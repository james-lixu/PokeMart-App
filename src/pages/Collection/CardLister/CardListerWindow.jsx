import React from 'react';
import CardListerCard from './CardListerCard';
import './CardListerWindow.css';

const CardListerWindow = ({ cards, onCardClick }) => {
  const card_collection = cards.data || [];

  return (
    <div id='collection-card-results'>
      {card_collection.map(card => (
        <CardListerCard key={card.id} card={card} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardListerWindow;