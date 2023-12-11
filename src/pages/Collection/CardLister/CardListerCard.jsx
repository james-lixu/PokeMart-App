import React from 'react';
import './CardListerCard.css';


const CardListerCard = ({ card, onCardClick }) => {
  const price = card.price ?? 0;
  return (
    <li className='collection-card' onClick={() => onCardClick(card)}>
      <img src={card.small_image_url} alt={`Card ${card.name}`} />
      <h3>{card.name}</h3>
      <h3>#{card.national_pokedex_numbers}</h3>
      <p>Price: ${price.toFixed(2)}</p>
    </li>
  );
};

export default CardListerCard;
